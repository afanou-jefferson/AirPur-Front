
import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../../models/map.service';
import { MeteoIndicateur } from '../../models/meteoindicateur.model';
import { RelevePolluant } from '../../models/relevePolluant.model';
import {MatDialog} from '@angular/material/dialog';
import {CreationRelevePersoComponent} from '../creation-releve-perso/creation-releve-perso.component';
import { HistoriqueComponent } from '../historique/historique.component';
import { AuthService } from 'src/app/profil/auth/services/auth.service';

@Component({
    selector: 'liste-releve',
    templateUrl: './listeReleve.component.html',
    styleUrls: ['./listeReleve.component.scss']
  })
export class ListeRelevesComponent implements OnInit {
    relevesPolluants: RelevePolluant[] = [];
    relevesMeteo: MeteoIndicateur;
    displayedColumns: string[] = ['nom', 'valeur', 'dateDebut', 'dateFin'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    name: string;
    connected : boolean;
    noDataMeteo: boolean = true;



    constructor(private mapService: MapService, public dialog: MatDialog, public authServ: AuthService) {

    }

    ngOnInit() {
      this.subscribeToPolluant();
      this.subscribeToMeteo();

      this.authServ.utilisateurConnecteObs.subscribe(
        utilisateurConnected => {
            if(!utilisateurConnected.estAnonyme()) {
              //console.debug("IL N EST PAS ANONYME ", utilisateurConnected)
                this.connected = true;
            }
        },
        utilisateurNoConnected => {
            console.log(utilisateurNoConnected);
        }
    )
    }

    subscribeToPolluant() {
      this.mapService.onPolluant().subscribe(
        relevesPolluants => this.relevesPolluants = relevesPolluants,
        error => console.debug("erreur ", error)
      )
    }

    subscribeToMeteo() {
      this.mapService.onMeteo().subscribe(
        relevesMeteo => { this.relevesMeteo = new MeteoIndicateur(relevesMeteo);
                          this.noDataMeteo = false;
                      },
        error => { console.debug("erreur ", error) , this.noDataMeteo = true }
      )
    }

    openFavoris() {
      const dialogRef = this.dialog.open(CreationRelevePersoComponent);

      // On créer ci-dessus une modale qu'on affiche ci dessous
      dialogRef.afterClosed().subscribe(result =>{
        console.debug(`Dialog result: ${result}`);
      });
    }

    openHistorique() {
      const dialogRef = this.dialog.open(HistoriqueComponent ,
                                          { width: '70%'});

      dialogRef.afterClosed().subscribe(result => {
        console.debug(`Dialog result: ${result}`);
      });
    }

}
