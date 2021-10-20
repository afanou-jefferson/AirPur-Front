import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConditionsGenComponent } from './conditions-gen/conditions-gen.component';
import { ConfidentialiteComponent } from './confidentialite/confidentialite.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { CookiesComponent } from './cookies/cookies.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterRoutingModule } from './footer-routing.module';

@NgModule({
  declarations: [
    ConditionsGenComponent,
    ConfidentialiteComponent,
    AProposComponent,
    CookiesComponent,
  ],
  imports: [CommonModule, SharedModule, FooterRoutingModule],
})
export class FooterModule {}
