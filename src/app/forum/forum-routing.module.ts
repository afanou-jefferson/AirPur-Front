import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './components/forum.component';
import { MessageComponent } from './components/message/component/message.component';
import { RubriqueComponent } from './components/rubrique/component/rubrique.component';


const routes : Routes = [
  {
    path: '',
    component: ForumComponent,
    children: [
      {
        path : 'rubrique',
        component : RubriqueComponent
      },
      //Ajoout app-message dans le routique
      {
        path : 'message',
        component : MessageComponent
      },

      {
        path : 'message/:rubriqueId',
        component : MessageComponent
      },
      {
        path : '**',
        redirectTo : 'rubrique'
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
export class ForumRoutingModule {}
