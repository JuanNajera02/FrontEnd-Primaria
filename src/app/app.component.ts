import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  RegisterForm: FormGroup;
  LoginForm: FormGroup;

  // Inicialzar los formularios
  constructor() {
    this.RegisterForm = new FormGroup({
      user: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
    });
    this.LoginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }




  title = 'Primarias';
}
