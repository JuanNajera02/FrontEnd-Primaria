import { Component } from '@angular/core';
import { SupervisorFormComponent } from './supervisor-form/supervisor-form.component';

@Component({
  selector: 'app-supervisor-register',
  standalone: true,
  imports: [SupervisorFormComponent],
  templateUrl: './supervisor-register.component.html',
  styleUrl: './supervisor-register.component.css'
})
export class SupervisorRegisterComponent {

}
