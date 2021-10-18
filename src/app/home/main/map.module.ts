import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MapRoutingModule } from "./map-routing.module"
import { GoogleMapsModule } from '@angular/google-maps';
import { CreationRelevePersoComponent } from "./components/creation-releve-perso/creation-releve-perso.component";
import { HistoriqueComponent } from "./components/historique/historique.component";
import { ListeRelevesComponent } from "./components/listeReleve/listeReleve.component";
import { MapLeafletComponent } from './components/map-leaflet/map-leaflet.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { RouterModule } from 'node_modules/@angular/router';

import { MapService } from "./models/map.service";
import {FavorisService} from "./models/favoris.service";
@NgModule({
    declarations: [
      ListeRelevesComponent,
      CreationRelevePersoComponent,
      HistoriqueComponent,
      MapLeafletComponent
    ],
    imports: [
      CommonModule,
      MapRoutingModule,
      GoogleMapsModule,
      SharedModule,
      FormsModule,
      RouterModule
    ],
    providers: [
      MapService,
      FavorisService
    ]
  })
  export class MapModule { }
