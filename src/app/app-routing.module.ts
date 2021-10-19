import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './profil/notification/components/notification.component';

const routes: Routes = [
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then((res) => res.MapModule),
  },

  {
    path: 'profil',
    loadChildren: () =>
      import('./profil/profile.module').then((res) => res.ProfileModule),
  },

  {
    path: 'legal',
    loadChildren: () =>
      import('./core/footer/footer.module').then((res) => res.FooterModule),
  },
  {
    path: 'forum',
    loadChildren: () =>
      import('./forum/forum.module').then((res) => res.ForumModule),
  },

  { path: 'notifications', component: NotificationComponent },
  { path: '**', redirectTo: 'map' },
  { path: '', redirectTo: 'map', pathMatch: 'full' },

  //{ path: 'conditionsGen', component: ConditionsGenComponent},
  //{ path: 'confidentialites', component: ConfidentialiteComponent},
  //{ path: 'aPropos', component: AProposComponent},
  ///{ path: 'cookies', component: CookiesComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
