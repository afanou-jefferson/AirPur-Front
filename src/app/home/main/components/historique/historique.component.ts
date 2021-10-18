import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/home/profil/auth/core/auth.service';
import { Commune } from '../../models/commune.model';
import { MapService } from '../../models/map.service';
import { MeteoIndicateur } from '../../models/meteoindicateur.model';
import { RelevePolluant } from '../../models/relevePolluant.model';


@Component({
  selector: 'historique-releve',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  relevesPolluants: RelevePolluant[] = [];
  relevesMeteo: MeteoIndicateur;

  formulaireHistorique: FormGroup;

  infosFromBack = false;
  communeSelected: any;
  nomCommuneSelected: string;

  displayedColumns: string[] = ['nom', 'valeur', 'dateDebut', 'dateFin'];
  columnsToDisplay: string[] = this.displayedColumns.slice();


  constructor(fb: FormBuilder, private mapService: MapService, public dialog: MatDialog, public authServ: AuthService) {
    this.formulaireHistorique = fb.group({
      commune: [],
      dateDebut: [],
      dateFin: []
    });
  }

  ngOnInit() {
    this.authServ.utilisateurConnecteObs.subscribe(
      utilisateurConnected => {
        if (!utilisateurConnected.estAnonyme()) {
          this.communeSelected = JSON.parse(localStorage.getItem("commune")) as Commune;
          this.nomCommuneSelected = this.communeSelected.nomCommune;
        }
      })
  }


  subscribeToHistoriquePolluant() {
    this.mapService.getHistoriquePolluantStation(
        JSON.parse( localStorage.getItem('commune')).idCommune,
        this.formulaireHistorique.get("dateDebut").value,
        this.formulaireHistorique.get("dateFin").value
      )
      .subscribe(
      relevesPolluants => this.relevesPolluants = relevesPolluants,
      error => console.log("erreur ", error)
    )
  }

}
