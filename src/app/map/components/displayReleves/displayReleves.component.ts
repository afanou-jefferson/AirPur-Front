import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../../models/map.service';
import { MeteoIndicateur } from '../../models/meteoindicateur.model';
import { RelevePolluant } from '../../models/relevePolluant.model';
import { MatDialog } from '@angular/material/dialog';
import { CreationRelevePersoComponent } from '../creation-releve-perso/creation-releve-perso.component';
import { HistoriqueComponent } from '../historique/historique.component';
import { AuthService } from 'src/app/profil/auth/services/auth.service';

@Component({
  selector: 'display-releves',
  templateUrl: './displayReleves.component.html',
  styleUrls: ['./displayReleves.component.scss'],
})
export class DisplayRelevesComponent implements OnInit {
  relevesPolluants: RelevePolluant[] = [];
  relevesMeteo: MeteoIndicateur;
  name: string;
  connected: boolean;
  noDataMeteo: boolean = true;

  constructor(
    private mapService: MapService,
    public dialog: MatDialog,
    public authServ: AuthService
  ) {}

  ngOnInit() {
    this.subscribeToMeteo();
    this.subscribeToPolluant();

    this.authServ.utilisateurConnecteObs.subscribe(
      (utilisateurConnected) => {
        if (!utilisateurConnected.estAnonyme()) {
          this.connected = true;
        }
      },
      (utilisateurNoConnected) => {
        console.debug(utilisateurNoConnected);
      }
    );

    this.goToMontpellierOnInit();
  }

  subscribeToMeteo() {
    this.mapService.onMeteo().subscribe(
      (relevesMeteo) => {
        this.relevesMeteo = new MeteoIndicateur(relevesMeteo);
        this.noDataMeteo = false;
      },
      (error) => {
        console.debug('erreur ', error), (this.noDataMeteo = true);
      }
    );
  }

  /**
   * TRICKS ON INIT POUR AFFICHER MONTPELLIER PAR DEFAUT
   */
  goToMontpellierOnInit(): void {
    this.mapService.getPolluantsByStation(33).subscribe(
      (releves) => {
        this.relevesPolluants = releves;
      },
      (error) => console.log(error)
    );

    this.mapService.getMeteoByCommune(13188).subscribe(
      (meteoReleve) => {
        this.mapService.emitMeteo(meteoReleve);
      },
      (error) => console.log(error)
    );
  }

  subscribeToPolluant() {
    this.mapService.onPolluant().subscribe(
      (relevesPolluants) => (this.relevesPolluants = relevesPolluants),
      (error) => console.debug('erreur ', error)
    );
  }

  openFavoris() {
    const dialogRef = this.dialog.open(CreationRelevePersoComponent);

    // On créer ci-dessus une modale qu'on affiche ci dessous
    dialogRef.afterClosed().subscribe((result) => {
      console.debug(`Dialog result: ${result}`);
    });
  }

  openHistorique() {
    const dialogRef = this.dialog.open(HistoriqueComponent, { width: '70%' });

    dialogRef.afterClosed().subscribe((result) => {
      console.debug(`Dialog result: ${result}`);
    });
  }
}
