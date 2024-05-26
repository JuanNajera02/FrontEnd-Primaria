import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MonetaryService} from "../monetary.service";
import {Movimiento} from "../Interfaces/MovimientoResponse";
import {ActivatedRoute} from "@angular/router";
import { ClasificacionService } from '../clasificacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monetary-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './monetary-search.component.html',
  styleUrl: './monetary-search.component.css'
})
export class MonetarySearchComponent implements OnInit{

  nuevaClasificacion:string = ""
  
  idMovimiento: string = "";
  
  Rol: string = "Rol"
  isSupervisor: boolean = false;

  @Output() movimientoEvent = new EventEmitter<Movimiento>
  constructor(private monetaryServ:MonetaryService,private route:ActivatedRoute, private clasServ:ClasificacionService) {}
  
  ngOnInit(): void {
    this.Rol = this.obtenerRol();
    this.isSupervisor = this.Rol === 'Supervisor';
  }
  obtenerRol(){
    return JSON.parse(localStorage.getItem("usuarioPrimaria") as string).rolUsuario
  }

  crearClasificacion() {
    this.clasServ.crearClasificacion(this.nuevaClasificacion).subscribe({
      next: (res) => {
        this.nuevaClasificacion = ""
        alert("Clasificación creada con éxito")
      },
      error: (err) => alert(err.error.message)
    })
  }
  buscarMovimiento() {
    if (Number.parseInt(this.idMovimiento) < 0) return;
    const idEscuela = this.route.snapshot.queryParams['idEscuela']

    this.monetaryServ.getMovimiento(this.idMovimiento,idEscuela).subscribe({
      next : (movimiento) => {
        this.movimientoEvent.emit(movimiento)
      },
      error: (error) => alert(error.error.message)
    })
  }
}
