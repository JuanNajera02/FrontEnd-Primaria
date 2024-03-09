import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Movimiento} from "../../monetary-register/Interfaces/MovimientoResponse";
import {MonetaryService} from "../../monetary-register/monetary.service";
import {SchoolService} from "../school.service";
import {School} from "../School";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-school-search',
  standalone: true,
    imports: [
        ReactiveFormsModule,FormsModule
    ],
  templateUrl: './school-search.component.html',
  styleUrl: './school-search.component.css'
})
export class SchoolSearchComponent {

  idEscuela: string = "";

  @Output() escuelaEvent = new EventEmitter<School>
  constructor(private escuelaServ:SchoolService,private routeActivated:ActivatedRoute) {}

  hasIdEscuela():boolean{
    const params = this.routeActivated.snapshot.queryParams
    console.log("params",params)
    return params.hasOwnProperty('idEscuela') && params['idEscuela'] !== ''
  }
  buscarEscuela() {
    if(!this.hasIdEscuela()){
      alert("Seleccione una escuela")
      return
    }
    if (Number.parseInt(this.idEscuela) < 0) return;
    this.escuelaServ.getEscuela(this.idEscuela).subscribe({
      next : (escuela) => this.escuelaEvent.emit(escuela),
      error: (error) => console.log(error.message)
    })
  }

}
