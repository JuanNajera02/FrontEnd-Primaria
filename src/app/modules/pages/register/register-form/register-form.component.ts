import { Component } from '@angular/core';
import { Register } from '../../../../shared/models/Register';
import { Role } from '../../../../shared/models/Role';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterService } from '../register.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {


  constructor(private registerserv: RegisterService ,private route:ActivatedRoute) {}


  Register: Register = {
    role: Role.DIRECTOR,
    user: '',
    email: '',
    password: '',
    passwordVerification: '',
  };
  error: any;

  handleErrors():string{
    let messageError = "";
    if (this.Register.user === "") messageError += "El usuario no puede estar vacio\n";
    if (this.Register.email === "") messageError += "El email no puede estar vacio\n";
    if (this.Register.password === "") messageError += "La contraseña no puede estar vacia\n";
    if (this.Register.passwordVerification === "") messageError += "La verificación de contraseña no puede estar vacia\n";
    if (this.Register.password !== this.Register.passwordVerification) messageError += "Las contraseñas no coinciden\n";
    return messageError;


  }

  register(){

  }

}
