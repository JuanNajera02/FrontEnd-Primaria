import { Component } from '@angular/core';
import { Credential } from '../../../../shared/models/Credential';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {AuthenticationService} from "../../../../shared/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private authServ:AuthenticationService,    private router: Router) {}

  creds: Credential = {
    usuario: '',
    password: ''
  };
  error: any;

  loginSuccess(id:string,rol:string){

    this.router.navigate(["/home"])

    const data = {
      "usuario":this.creds.usuario,
      "idUsuario":id,
      "rolUsuario":rol
    }
    localStorage.setItem("usuarioPrimaria",JSON.stringify(data))

  }

  login() {
    this.authServ.signIn(this.creds).subscribe({
      next:(data) => this.loginSuccess(data.idUsuario,data.rol),
      error: (err) => console.log(err.message)
    })
  }



}
