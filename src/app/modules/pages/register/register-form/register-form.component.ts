import { Component } from '@angular/core';
import { Register } from '../../../../shared/models/Register';
import { Role } from '../../../../shared/models/Role';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  Register: Register = {
    role: Role.DIRECTOR,
    user: '',
    email: '',
    password: '',
    passwordVerification: '',
  };
  error: any;


  register(){

  }

}
