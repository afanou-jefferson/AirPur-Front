import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MapRoutingModule } from "./map-routing.module"
import { GoogleMapsModule } from '@angular/google-maps';
import { CreateComponent } from "./components/create/create.component";
import { HistoriqueComponent } from "./components/historique/historique.component";
import { ListeRelevesComponent } from "./components/listeReleve/listeReleve.component";
import { MapComponent } from './components/map/map.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { RouterModule } from 'node_modules/@angular/router';

import { MapService } from "./core/map.service";
import {FavorisService} from "./core/favoris.service";
@NgModule({
    declarations: [
      ListeRelevesComponent,
      CreateComponent,
      HistoriqueComponent,
      MapComponent
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
