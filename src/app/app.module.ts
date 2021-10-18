import { NotificationComponent } from './home/notification/components/notification.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './home/profil/auth/components/auth.component';
import { AuthService } from './home/profil/auth/core/auth.service';
import { MenuService } from './home/profil/auth/core/menu.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';

import { LegalModule } from './home/legal/legal.module';

import { GoogleMapsModule } from '@angular/google-maps';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MapService } from './home/main/models/map.service';

import {MatAutocompleteModule} from '@angular/material/autocomplete';



//import { ConditionsGenComponent } from './home/legal/conditions-gen/conditions-gen.component';
//import { ConfidentialiteComponent } from './home/legal/confidentialite/confidentialite.component';
//import { AProposComponent } from './home/legal/a-propos/a-propos.component';
//import { CookiesComponent } from './home/legal/cookies/cookies.component';

@NgModule({
  declarations: [
    AppComponent,
   // AuthComponent,
   // ConditionsGenComponent,
   // ConfidentialiteComponent,
   // AProposComponent,
   // CookiesComponents
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    GoogleMapsModule,
    LegalModule,
    FormsModule,
    MatAutocompleteModule,
  ],
  providers: [
    AuthService,
    MenuService,
    MapService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
