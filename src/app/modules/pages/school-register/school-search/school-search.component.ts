import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Movimiento} from "../../monetary-register/Interfaces/MovimientoResponse";
import {MonetaryService} from "../../monetary-register/monetary.service";
import {SchoolService} from "../school.service";
import {School} from "../School";
import {ActivatedRoute} from "@angular/router";
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import {UserService} from "../User.service";
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

  idUsuario:string = ""


  constructor(private escuelaServ:SchoolService,private routeActivated:ActivatedRoute,private usersServ:UserService) {}

  ngOnInit(): void {
    this.obtenerTodasEscuelas()
    this.getUsers()
  }

  usuarios:any[] = []

  getUsers() {
    this.usersServ.getUsers().subscribe({
      next: (users) => this.usuarios = users,
      error: (err) => console.log(err.message)
    })
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
      
      this.escuelaServ.asignarEscuela(this.idUsuario, this.idEscuela).subscribe({
        next: (response) => {
          this.idEscuela = ""
          this.idUsuario = ""    
          alert("Escuela asignada correctamente")
        },
        error: (error) => alert(error.message)
      })
    }

  
  onSchoolSelectionChange() {
    if (Number.parseInt(this.idEscuela) < 0) return;
    this.escuelaServ.getEscuela(this.idEscuela).subscribe({
      next : (escuela) => this.escuelaEvent.emit(escuela),
      error: (error) => console.log(error.message)
    })
  }

}
