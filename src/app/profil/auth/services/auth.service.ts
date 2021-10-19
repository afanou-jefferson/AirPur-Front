import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { Utilisateur } from '../models/utilisateur.model';

/**
 * Collègue anonyme.
 *
 */
const UTILISATEUR_ANONYME = new Utilisateur({});

/**
 * Service de gestion de l'authentification.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Flux du collègue connecté. Les abonnés sont notifiés dès qu'une connexion ou une déconnexion a lieu.
   *
   * A l'initialisation, le collègue connecté vaut 'undefined'.
   *
   */
  private utilisateurConnecteSub: BehaviorSubject<Utilisateur> = new BehaviorSubject(UTILISATEUR_ANONYME);

  constructor(private http: HttpClient) {
  }

  /**
   * Interface Observable du collègue connecté.
   *
   */
  get utilisateurConnecteObs(): Observable<Utilisateur> {
    return this.utilisateurConnecteSub.asObservable();
  }


  /**
   * Service permettant de vérifier si un collegue est authentifié.
   *
   * Une requête HTTP est déclenchée pour récupérer le collègue connecté s'il n'est pas en cache.
   *
   */
  verifierAuthentification(): Observable<Utilisateur> {
    // SI IL EST ANONYME
    if(this.utilisateurConnecteSub.getValue().estAnonyme()) {
      console.log("il est anonyme")
      const utilisateur = this.getUserFromCache();
      // SI IL EST EN CACHE
        if(!!utilisateur) {
          console.log("il est en cache")
          return of(utilisateur);
          // PAS DANS LE CACHE
        } else {
          console.log("il n'est pas en cache")
          return this.http.get<Utilisateur>(`http://localhost:8080/me`, {withCredentials: true})
                  .pipe(
                    map(colServeur => new Utilisateur(colServeur)),
                    tap(col => this.utilisateurConnecteSub.next(col)),
                    catchError(err => of(UTILISATEUR_ANONYME)));
        }
    } else {
      console.log("else anonyme")
      // SI IL N EST PAS ANONYME ON RENVOIE LUTILISATEUR EN CACHE
      of(this.utilisateurConnecteSub.getValue());
    }
  }

  /**
   * Connexion de l'utilisateur.
   *
   * Le serveur provoque la création du cookie AUTH-TOKEN.
   *
   */
  connecter(email: string, mdp: string): Observable<Utilisateur> {

    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post("http://localhost:8080/login",
      new HttpParams().set('username', email).set('password', mdp), config)
      .pipe(
        map(utilisateurServeur => new Utilisateur(utilisateurServeur)),
        tap(u => {
          this.persistUser(u);
          this.utilisateurConnecteSub.next(u);
          console.log("coucou", u);
        })

      );
  }

  persistUser(utilisateur : Utilisateur) {
       localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
  }

  getUserFromCache() : Utilisateur {
    return JSON.parse(localStorage.getItem("utilisateur")) as Utilisateur;
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
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    localStorage.removeItem("idUtilisateur");
    localStorage.removeItem("roleUtilisateur");

    return this.http.post<Utilisateur>("http://localhost:8080/logout", null , config)
      .pipe(
        tap(user => this.utilisateurConnecteSub.next(UTILISATEUR_ANONYME))
      );

  }


  isAuthenticated() {
    return localStorage.getItem("idUtilisateur") != null ? true: false;
  }

}
