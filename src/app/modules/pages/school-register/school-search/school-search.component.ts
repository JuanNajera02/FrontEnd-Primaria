import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Movimiento} from "../../monetary-register/Interfaces/MovimientoResponse";
import {MonetaryService} from "../../monetary-register/monetary.service";
import {SchoolService} from "../school.service";
import {School} from "../School";
import {ActivatedRoute} from "@angular/router";
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-school-search',
  standalone: true,
    imports: [
        ReactiveFormsModule,FormsModule,CommonModule,MatSelectModule
    ],
  templateUrl: './school-search.component.html',
  styleUrl: './school-search.component.css'
})
export class SchoolSearchComponent implements OnInit {


 

  idEscuela: string = "";

  allEscuelas: School[] = []
  @Output() escuelaEvent = new EventEmitter<School>
  constructor(private escuelaServ:SchoolService,private routeActivated:ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerTodasEscuelas()
  }
  obtenerTodasEscuelas(){
    this.escuelaServ.getAllEscuelas().subscribe({
      next: (escuelas) => this.allEscuelas = escuelas,
      error: (error) => console.log(error.message)
    })
  }

  hasIdEscuela():boolean{
    const params = this.routeActivated.snapshot.queryParams
    console.log("params",params)
    return params.hasOwnProperty('idEscuela') && params['idEscuela'] !== ''
  }

  asignarEscuela() {
      const id_usuario:string = JSON.parse(localStorage.getItem("usuarioPrimaria") as string).idUsuario

      this.escuelaServ.asignarEscuela(id_usuario, this.idEscuela).subscribe({
        next: (response) => {
          alert("Escuela asignada correctamente")
          console.log(response)
        },
        error: (error) => alert(error.message)
      })
    }

  
  onSchoolSelectionChange() {
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
