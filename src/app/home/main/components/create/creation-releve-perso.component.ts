import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FavorisCreation } from '../../core/favorisCreation.model';
import { FavorisService } from '../../core/favoris.service';
import { MapService } from '../../core/map.service';
@Component({
    selector: 'creation-releve-perso',
    templateUrl: './creation-releve-perso.component.html',
    styleUrls: ['./creation-releve-perso.component.scss']
  })
  export class CreationRelevePersoComponent implements OnInit {

    formulaireFavoris: FormGroup;
    favoris: FavorisCreation = new FavorisCreation();

    constructor(fb: FormBuilder, private mapService: MapService, private favorisService : FavorisService) {
      this.formulaireFavoris = fb.group({
        indicateur: [],
        dateDebut: [],
        departement: []
      });
    }

    ngOnInit() {
      this.mapService.onPolluant();
    }

    validFavoris() {
      let favoris : FavorisCreation = new FavorisCreation();
      this.convertPropertiesToBoolean(favoris);
      this.feedFavoris(favoris);
      this.favorisService.creerFavoris(favoris).subscribe(
        success => console.log("success ", success),
        error => console.log("error ", error)
      );
    }

    convertPropertiesToBoolean(favoris : FavorisCreation) {
      if(this.formulaireFavoris.get("indicateur").value === "air") {
        favoris.air = true;
        favoris.meteo = false;
      } else {
        favoris.air = false;
        favoris.meteo = true;
      }
      return favoris;
    }

    feedFavoris(favoris : FavorisCreation) {
      favoris.choixDateDebut= this.formulaireFavoris.get("dateDebut").value;
      favoris.choixDateFin= this.formulaireFavoris.get("dateFin").value;
      favoris.communeId= JSON.parse( localStorage.getItem('commune')).idCommune;
      favoris.utilisateurId= JSON.parse( localStorage.getItem('utilisateur')).id;

      return favoris;
    }
  }
