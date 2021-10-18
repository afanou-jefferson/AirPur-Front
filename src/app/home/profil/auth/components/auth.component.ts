import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/home/profil/auth/core/menu.service';
import { Utilisateur } from '../core/auth.domain';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  utilisateur: Utilisateur = new Utilisateur({});
  err: boolean;

  constructor(private authSrv: AuthService, private router: Router, private menuService : MenuService) { }

  ngOnInit() {
  }

  connecter() {
    // RAJOUTER LES CHECKER SUR LES PROPS ANGULAR MATERIEL
    this.authSrv.connecter(this.utilisateur.email, this.utilisateur.motDePasse)
      .subscribe(
        // en cas de succès, redirection vers la page /d'acceuil
       col => {

      },
        // en cas d'erreur, affichage d'un message d'erreur
        err => this.err = true
      );

      this.authSrv.utilisateurConnecteObs.subscribe(
        success => this.router.navigate(['map']),
        echec => console.log(echec)
      )
  }

  getRoles(utilisateur: Utilisateur) : string {
    return this.menuService.recupererRoleUtilisateur(utilisateur);
  }
}
