import { Component } from '@angular/core';
import { Register } from '../../../../shared/models/Register';
import { Register2 } from '../../../../shared/models/Register';
import { Role } from '../../../../shared/models/Role';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterService } from '../../register/register.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './supervisor-form.component.html',
  styleUrl: './supervisor-form.component.css'
})
export class SupervisorFormComponent {

  constructor(private registerserv: RegisterService ,private route:ActivatedRoute, private router: Router) {}


  Register: Register2 = {
    idRol: "5",
    usuario: '',
    email: '',
    password: '',
    passwordVerification: '',
  };
  error: any;

  handleErrors(Register: Register2):string{
    let messageError = "";
    if (Register.usuario === "") messageError += "El usuario no puede estar vacio\n";
    if (Register.email === "") messageError += "El email no puede estar vacio\n";
    if (Register.password === "") messageError += "La contraseña no puede estar vacia\n";
    if (Register.passwordVerification === "") messageError += "La verificación de contraseña no puede estar vacia\n";
    if (Register.password !== Register.passwordVerification) messageError += "Las contraseñas no coinciden\n";
    return messageError;


  }

  register(Register: Register2): void {
    let messageError = this.handleErrors(Register);
    if (messageError.length === 0){
      this.registerserv.registerUser(Register).subscribe({
        next: (data) => {
          console.log(data);
          alert('Usuario registrado con éxito');
          this.router.navigate(["/home"]);
        },
        error: (error) => {
          console.error('There was an error!', error);
          error = this.error;
        }
      })
    }
    else{
    //  this.error = messageError
      alert(messageError);
    }

}
}
