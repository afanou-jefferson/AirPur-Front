import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MapRoutingModule } from "./map-routing.module"
import { GoogleMapsModule } from '@angular/google-maps';
import { CreateComponent } from "./components/create/create.component";
import { HistoriqueComponent } from "./components/historique/historique.component";
import { ListeRelevesComponent } from "./components/listeReleve/listeReleve.component";
import { MapComponent } from './components/map.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { MapService } from "./core/map.service";
import { FormsModule } from '@angular/forms';
import { RouterModule } from 'node_modules/@angular/router';

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
      MapService
    ],
    exports: [
    ]
  })
  export class MapModule { }
