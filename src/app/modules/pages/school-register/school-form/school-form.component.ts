import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MonetarySearchComponent} from "../../monetary-register/monetary-search/monetary-search.component";
import {MonetaryTitleComponent} from "../../monetary-register/monetary-title/monetary-title.component";
import {School} from "../School";
import {SchoolTitleComponent} from "../school-title/school-title.component";
import {SchoolSearchComponent} from "../school-search/school-search.component";
import {SchoolService} from "../school.service";
import { AssignedSchoolsListComponent } from "../assigned-schools-list/assigned-schools-list.component";
import { UserService } from '../User.service';

@Component({
    selector: 'app-school-form',
    standalone: true,
    templateUrl: './school-form.component.html',
    styleUrl: './school-form.component.css',
    imports: [
        FormsModule,
        MonetarySearchComponent,
        MonetaryTitleComponent,
        SchoolTitleComponent,
        SchoolSearchComponent,
        AssignedSchoolsListComponent
    ]
})
export class SchoolFormComponent implements OnInit{

  constructor(private schoolServ:SchoolService) {}
  
  ngOnInit(): void {
    this.getEscuelas()
  }

  escuelasAsignadas:School[] = []
  escuela:School = {
    clave: "",
    id: '',
    nombre: '',
    sector: '',
    zona: '',
    localidad: ''
  }

  getEscuelas(){
    const username:string = JSON.parse(localStorage.getItem("usuarioPrimaria") as string).usuario

    this.schoolServ.getEscuelas(username).subscribe({ 
      next:(schools) => this.escuelasAsignadas = schools,
      error: (err) => console.log(err.message)
    })
  }

  handleErrors():string{
    let errorMessage = ""
    if (this.escuela.clave === "") errorMessage += "Clave no puede estar vacia\n"
    if (this.escuela.nombre === "") errorMessage += "Nombre no puede estar vacio\n"
    if (this.escuela.sector === "") errorMessage += "Sector no puede estar vacio\n"
    if (this.escuela.zona === "") errorMessage += "Zona no puede estar vacia\n"
    if (this.escuela.localidad === "") errorMessage += "Localidad no puede estar vacia\n"
    return errorMessage

  }
  cleanInputs(){
    this.escuela.clave = ""
    this.escuela.nombre = ""
    this.escuela.sector = ""
    this.escuela.zona = ""
    this.escuela.localidad = ""

  }
  registrarEscuela() {
    this.schoolServ.registrarEscuela(this.escuela).subscribe({
      next: () => {
        alert("Escuela registrada correctamente")
        this.cleanInputs()
      },
      error: (err) =>{
        console.log(err.message)
        alert(this.handleErrors())
      }
    })
  }

  receiveEscuela(escuela:School){
    this.escuela = escuela
  }
}
