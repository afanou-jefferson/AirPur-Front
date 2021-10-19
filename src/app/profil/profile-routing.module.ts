import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/components/auth.component';
import { CompteComponent } from './compte/components/compte.component';
import { InscriptionComponent } from './inscription/component/inscription.component';
import { FavorisComponent } from './favoris/components/favoris.component';

const routes : Routes = [ 
   

  { path: '', component: CompteComponent},
  { path: 'connexion', component: AuthComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'favoris', component: FavorisComponent},
  { path: 'moncompte', component: CompteComponent},
  { path: '**', redirectTo :''}
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}