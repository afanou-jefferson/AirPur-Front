import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AProposComponent } from './a-propos/a-propos.component';
import { ConditionsGenComponent } from './conditions-gen/conditions-gen.component';
import { ConfidentialiteComponent } from './confidentialite/confidentialite.component';
import { CookiesComponent } from './cookies/cookies.component';

const routes: Routes = [
  { path: 'conditionsGen', component: ConditionsGenComponent },
  { path: 'confidentialites', component: ConfidentialiteComponent },
  { path: 'aPropos', component: AProposComponent },
  { path: 'cookies', component: CookiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterRoutingModule {}
