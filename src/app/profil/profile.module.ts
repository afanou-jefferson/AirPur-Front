import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { InscriptionComponent } from './inscription/component/inscription.component';
import { CompteComponent } from './compte/components/compte.component';
import { AuthComponent } from './auth/components/auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { FavorisService } from './compte/core/favoris.service';
import { FavorisComponent } from "./favoris/components/favoris.component";


@NgModule({
    declarations: [
      InscriptionComponent,
      CompteComponent,
      AuthComponent,
      FavorisComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      ProfileRoutingModule
    ],
    providers : [
      FavorisService,

    ],
    exports : [
      
    ]
  })
  export class ProfileModule { }
