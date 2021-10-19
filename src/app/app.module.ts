import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './core/footer/footer.module';
import { MapService } from './map/models/map.service';
import { AuthService } from './profil/auth/services/auth.service';
import { MenuService } from './profil/auth/services/menu.service';
import { NotificationComponent } from './profil/notification/components/notification.component';
import { SharedModule } from './shared/shared.module';

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
    NotificationComponent,
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
    FooterModule,
    FormsModule,
    MatAutocompleteModule,
  ],
  providers: [AuthService, MenuService, MapService],

  bootstrap: [AppComponent],
})
export class AppModule {}
