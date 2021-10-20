import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapService } from '../map/models/map.service';
import { AuthService } from '../profil/auth/services/auth.service';
import { MenuService } from '../profil/auth/services/menu.service';
import { NavbarPublicComponent } from './navbar-public/navbar-public.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NavRoutingModule } from './nav-routing.module';

@NgModule({
  declarations: [NavbarUserComponent, NavbarPublicComponent],
  imports: [CommonModule, NavRoutingModule, MatAutocompleteModule],
  providers: [AuthService, MenuService, MapService],
  exports: [NavbarUserComponent, NavbarPublicComponent],
})
export class NavModule {}
