import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Utilisateur } from '../models/utilisateur.model';

/**
 * Service de gestion de l'authentification.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * User anonyme.
   *
   */
  UTILISATEUR_ANONYME = new Utilisateur({});

  /**
   * Flux de l'user connecté. Les abonnés sont notifiés dès qu'une connexion ou une déconnexion a lieu.
   *
   * A l'initialisation, l'utilisateur connecté vaut 'undefined'.
   *
   */
  private utilisateurConnecteSub: BehaviorSubject<Utilisateur> =
    new BehaviorSubject(this.UTILISATEUR_ANONYME);

  constructor(private http: HttpClient) {}

  /**
   * Connexion de l'utilisateur.
   *
   * Le serveur provoque la création du cookie AUTH-TOKEN.
   *
   */
  seConnecter(email: string, mdp: string): Observable<Utilisateur> {
    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http
      .post(
        'http://localhost:8080/login',
        new HttpParams().set('username', email).set('password', mdp),
        config
      )
      .pipe(
        map((utilisateurServeur) => new Utilisateur(utilisateurServeur)),
        tap((u) => {
          this.saveUserInLocalStorage(u);
          this.utilisateurConnecteSub.next(u);
        })
      );
  }

  /**
   * Déconnexion de l'utilisateur.
   *
   * Le serveur provoque la suppression du cookie AUTH-TOKEN.
   *
   */
  seDeconnecter() {
    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    localStorage.removeItem('idUtilisateur');
    localStorage.removeItem('roleUtilisateur');

    return this.http
      .post<Utilisateur>('http://localhost:8080/logout', null, config)
      .pipe(
        tap((user) =>
          this.utilisateurConnecteSub.next(this.UTILISATEUR_ANONYME)
        )
      );
  }

  isAuthenticated() {
    return localStorage.getItem('idUtilisateur') != null ? true : false;
  }

  getUserFromLocalStorage(): Utilisateur {
    return JSON.parse(localStorage.getItem('utilisateur')) as Utilisateur;
  }

  saveUserInLocalStorage(utilisateur: Utilisateur) {
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
  }

  /**
   * Interface Observable du User connecté.
   *
   */
  get utilisateurConnecteObs(): Observable<Utilisateur> {
    return this.utilisateurConnecteSub.asObservable();
  }

  /**
   * Service permettant de vérifier si un collegue est authentifié.
   *
   * Une requête HTTP est déclenchée pour récupérer le User connecté s'il n'est pas en cache.
   *
   */
  verifierAuthentification(): Observable<Utilisateur> {
    // SI IL EST ANONYME
    if (this.utilisateurConnecteSub.getValue().estAnonyme()) {
      const utilisateur = this.getUserFromLocalStorage();
      // SI IL EST EN CACHE
      if (!!utilisateur) {
        return of(utilisateur);
        // PAS DANS LE CACHE
      } else {
        console.log("il n'est pas en cache");
        return this.http
          .get<Utilisateur>(`http://localhost:8080/me`, {
            withCredentials: true,
          })
          .pipe(
            map((colServeur) => new Utilisateur(colServeur)),
            tap((col) => this.utilisateurConnecteSub.next(col)),
            catchError((err) => of(this.UTILISATEUR_ANONYME))
          );
      }
    } else {
      // SI IL N EST PAS ANONYME ON RENVOIE LUTILISATEUR EN CACHE
      of(this.utilisateurConnecteSub.getValue());
    }
  }
}
