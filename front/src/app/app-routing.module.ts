import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { AuthGuard, AuthenticatedGuard } from './guards/authGuard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: LoginComponent
  },
  {
    path: 'home', 
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'user-profile/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/user-profile/user-profile.module').then((m) => m.UserProfileModule)
  }, 
  {
    path:'**', 
    redirectTo: '/home', 
    pathMatch: 'full'
  }  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
