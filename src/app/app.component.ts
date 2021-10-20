import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './profil/auth/models/utilisateur.model';
import { AuthService } from './profil/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'airpur';
  connected: boolean = false;

  userConnected: any;

  constructor(private authServ: AuthService) {
  }

  ngOnInit() {
    // Au lancement de l'application
    // check si l'utilisateur est en cache ou en bdd
    //this.authServ.verifierAuthentification().subscribe();

    this.authServ.utilisateurConnecteObs.subscribe(
      (utilisateurConnected) => {
        if (!utilisateurConnected.estAnonyme()) {
          this.connected = true;
          this.userConnected = JSON.parse(
            localStorage.getItem('utilisateur')
          ) as Utilisateur;
        }
      },
      (error) => {
        console.log('error on auth', error);
      }
    );
  }
}
