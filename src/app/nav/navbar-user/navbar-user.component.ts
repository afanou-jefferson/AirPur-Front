import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, tap, delay, filter, switchMap, finalize } from 'rxjs/operators';
import { CommuneInsee } from 'src/app/map/models/CommuneInsee.model';
import { MapService } from 'src/app/map/models/map.service';
import { Utilisateur } from 'src/app/profil/auth/models/utilisateur.model';
import { AuthService } from 'src/app/profil/auth/services/auth.service';
import { NotificationService } from 'src/app/profil/notification/core/notification.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css'],
})
export class NavbarUserComponent implements OnInit {
  title = 'airpur';
  connected: boolean = false;

  //SearchBar
  searchedCommune: FormControl = new FormControl();
  filteredCommunes: any;
  isLoading = false;
  errorMsg: string;
  communeSelected: CommuneInsee;

  userConnected: any;

  constructor(
    private authServ: AuthService,
    private router: Router,
    private mapServ: MapService,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.authServ.utilisateurConnecteObs.subscribe(
      (utilisateurConnected) => {
        console.log('ICIIIII ', utilisateurConnected);
        if (!utilisateurConnected.estAnonyme()) {
          console.log('IL N EST PAS ANONYME ', utilisateurConnected);
          this.connected = true;
          this.userConnected = JSON.parse(
            localStorage.getItem('utilisateur')
          ) as Utilisateur;
        }
      },
      (utilisateurNoConnected) => {
        console.log(utilisateurNoConnected);
      }
    );
  }

  ngOnInit() {
    // Au lancement de l'application
    // check si l'utilisateur est en cache ou en bdd
    this.authServ.verifierAuthentification().subscribe();

    this.searchedCommune.valueChanges
      .pipe(
        debounceTime(200),
        tap((val) => {
          this.errorMsg = '';
          this.filteredCommunes = [];
          this.isLoading = true;
          //console.log(typeof val);
          if (typeof val == 'object') {
            console.log("L'user a fait son choix !", val);
            this.router.navigate(['/map']);
            delay(500); //Permet de laisser la map charger avant de lancer le déplacement vers la ville selected
            this.chercherInfoGeoCommuneChoisie(val['codeInseeCommune']);
          }
        }),

        filter(
          (value) => {
            return typeof value == 'string';
          } // Retourne uniquement les valeurs qui sont des chaines de caractères. Quand l'user tape, value = string, quand il a choisi, value = commune object
        ), // Quand c'est string ca passe, quand c'est objet ca passe pas

        switchMap((value) =>
          this.mapServ.searchCommunes(value).pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      )
      .subscribe((data) => {
        // console.log(data);
        if (data == undefined) {
          this.errorMsg = data['Error'];
          this.filteredCommunes = [];
        } else {
          this.errorMsg = '';
          this.filteredCommunes = data;
        }

        //console.log(this.filteredCommunes);
      });
  }

  onLogoutClick() {
    this.authServ.seDeconnecter();
    this.router.navigate(['']);
    this.connected = false;
  }

  /**
   * Fonction qui permet de remplir le champs choixsi on click dans l'input
   */
  displayFn(subject) {
    return subject ? subject.nomCommune : undefined;
  }

  /**
   * Va chercher les coordonées Géo de la commune selectionée par l'USER et les envois au composant MAP pour centrer la caméra dessus
   */
  chercherInfoGeoCommuneChoisie(codeInsee: string) {
    this.mapServ
      .getCoordGeoCommunesByCodeInsee(codeInsee)
      .subscribe((communeInsee) => {
        console.log(communeInsee.centre);
        this.communeSelected = communeInsee;
        this.envoyerCommuneSearched(this.communeSelected);
      });
  }

  envoyerCommuneSearched(commune: CommuneInsee): void {
    this.mapServ.publierSearchedCommune(commune);
    console.log('Envoi Commune coté App');
  }

  openNotification() {
    this.notificationService.openHistorique();
  }
}
