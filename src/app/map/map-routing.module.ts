import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CreationRelevePersoComponent } from './components/creation-releve-perso/creation-releve-perso.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { DisplayRelevesComponent } from './components/displayReleves/displayReleves.component';
import { MapLeafletComponent } from './components/map-leaflet/map-leaflet.component';

const routes : Routes = [
  {
    path: '',
    component: MapLeafletComponent,
    children: [
      {
        path : 'displayReleve',
        component : DisplayRelevesComponent
      },
      {
        path : 'historique',
        component : HistoriqueComponent
      },
      {
        path : 'create',
        component : CreationRelevePersoComponent
      },
      {
        path : '**',
        redirectTo : 'displayReleves'
      }
    ]
  },
  {
    path : '**',
    redirectTo : ''
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {}
