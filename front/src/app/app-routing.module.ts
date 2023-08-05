import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home', 
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'user-profile/:id',
    loadChildren: () =>
      import('./modules/user-profile/user-profile.module').then((m) => m.UserProfileModule)
  }, 
  {
    path:'**', 
    redirectTo: '/', 
    pathMatch: 'full'
  }  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
