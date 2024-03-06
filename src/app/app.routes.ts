import { Routes } from '@angular/router';
import { LoginComponent } from './modules/pages/login/login.component';
import { MonetaryRegisterComponent } from './modules/pages/monetary-register/monetary-register.component';
import { RegisterComponent } from './modules/pages/register/register.component';
import { HomeComponent } from './modules/pages/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:"movimientos",component:MonetaryRegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent}
];
