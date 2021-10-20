import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './footer/footer.module';
import { MapService } from './map/models/map.service';
import { NavModule } from './nav/nav.module';
import { AuthService } from './profil/auth/services/auth.service';
import { MenuService } from './profil/auth/services/menu.service';
import { NotificationComponent } from './profil/notification/components/notification.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
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
    NavModule,
  ],
  providers: [AuthService, MenuService, MapService],

  bootstrap: [AppComponent],
})
export class AppModule {}
