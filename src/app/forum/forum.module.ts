import { NgModule } from '@angular/core';
import { ForumRoutingModule } from './forum-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageComponent } from './components/message/component/message.component';
import { ForumComponent } from './components/forum.component';
import { RouterModule } from 'node_modules/@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RubriqueComponent } from './components/rubrique/component/rubrique.component';



@NgModule({
    declarations: [
      RubriqueComponent,
       MessageComponent,
       ForumComponent
    ],
     imports: [
       CommonModule,
       SharedModule,
       ForumRoutingModule,
       RouterModule,
       HttpClientModule
      
     ],
    exports : [
       CommonModule
     ]
})
export class ForumModule {
}
