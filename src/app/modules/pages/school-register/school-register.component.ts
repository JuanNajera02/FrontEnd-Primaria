import { Component } from '@angular/core';
import {SchoolFormComponent} from "./school-form/school-form.component";
import {MonetaryFormComponent} from "../monetary-register/monetary-form/monetary-form.component";
import {NavBarComponent} from "../../../core/header/nav-bar/nav-bar.component";

@Component({
  selector: 'app-school-register',
  standalone: true,
  imports: [
    SchoolFormComponent,
    MonetaryFormComponent,
    NavBarComponent
  ],
  templateUrl: './school-register.component.html',
  styleUrl: './school-register.component.css'
})
export class SchoolRegisterComponent {

}
