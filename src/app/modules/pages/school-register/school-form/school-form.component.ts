import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MonetarySearchComponent} from "../../monetary-register/monetary-search/monetary-search.component";
import {MonetaryTitleComponent} from "../../monetary-register/monetary-title/monetary-title.component";
import {School} from "../School";
import {SchoolTitleComponent} from "../school-title/school-title.component";
import {SchoolSearchComponent} from "../school-search/school-search.component";
import {SchoolService} from "../school.service";

@Component({
  selector: 'app-school-form',
  standalone: true,
  imports: [
    FormsModule,
    MonetarySearchComponent,
    MonetaryTitleComponent,
    SchoolTitleComponent,
    SchoolSearchComponent
  ],
  templateUrl: './school-form.component.html',
  styleUrl: './school-form.component.css'
})
export class SchoolFormComponent {

  constructor(private schoolServ:SchoolService) {}
  escuela:School = {
    clave: "",
    id: '',
    nombre: '',
    balance: 0,
    sector: '',
    zona: '',
    localidad: ''
  }

  registrarEscuela(){
    this.schoolServ.registrarEscuela(this.escuela).subscribe(() => console.log("se agrego una escuela correctamente"))
  }
  receiveEscuela(escuela:School){
    this.escuela = escuela
  }
}
