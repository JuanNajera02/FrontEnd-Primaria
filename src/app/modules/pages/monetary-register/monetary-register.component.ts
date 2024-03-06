import { Component } from '@angular/core';
import { MonetaryTitleComponent } from './monetary-title/monetary-title.component';
import { MonetaryFormComponent } from './monetary-form/monetary-form.component';

@Component({
  selector: 'app-monetary-register',
  standalone: true,
  imports: [MonetaryFormComponent],
  templateUrl: './monetary-register.component.html',
  styleUrl: './monetary-register.component.css'
})
export class MonetaryRegisterComponent {

}
