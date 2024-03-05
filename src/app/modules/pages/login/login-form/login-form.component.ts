import { Component } from '@angular/core';
import { Credential } from '../../../../shared/models/Credential';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  creds: Credential = {
    usuario: '',
    password: ''
  };
  error: any;


  login() {

  }



}
