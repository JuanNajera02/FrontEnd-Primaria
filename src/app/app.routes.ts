import { Routes } from '@angular/router';
import { LoginComponent } from './modules/pages/login/login.component';
import { MonetaryRegisterComponent } from './modules/pages/monetary-register/monetary-register.component';
import { RegisterComponent } from './modules/pages/register/register.component';
import { ReportComponent } from './modules/pages/report/report.component';
import { HomeComponent } from './modules/pages/home/home.component';
import {authenticateGuard} from "./core/guards/authenticate.guard";
import {SchoolRegisterComponent} from "./modules/pages/school-register/school-register.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:"movimientos",component:MonetaryRegisterComponent,canActivate:[authenticateGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent},
  { path: 'report', component: ReportComponent},
  { path: 'home', component: HomeComponent,canActivate:[authenticateGuard]},
  {path:'escuelas',component:SchoolRegisterComponent,canActivate:[authenticateGuard]}
];
