import { Component } from '@angular/core';
import { MonetaryTitleComponent } from './monetary-title/monetary-title.component';
import { MonetaryFormComponent } from './monetary-form/monetary-form.component';
import {FormsModule} from "@angular/forms";
import {NavBarComponent} from "../../../core/header/nav-bar/nav-bar.component";

@Component({
  selector: 'app-monetary-register',
  standalone: true,
  imports: [MonetaryFormComponent,FormsModule,NavBarComponent],
  templateUrl: './monetary-register.component.html',
  styleUrl: './monetary-register.component.css'
})
export class MonetaryRegisterComponent {

}
