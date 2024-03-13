import {Component, OnInit} from '@angular/core';
import { MonetarySearchComponent } from '../monetary-search/monetary-search.component';
import { MonetaryTitleComponent } from '../monetary-title/monetary-title.component';
import {MonetaryService} from "../monetary.service";
import {Movimiento} from "../Interfaces/MovimientoResponse";
import {AddMovimientoReq} from "../Interfaces/AddMovimientoReq";
import {FormsModule} from "@angular/forms";
import { Clasificacion } from '../Interfaces/Clasificacion';
import {ClasificacionService} from "../../../../shared/clasificacion.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-monetary-form',
  standalone: true,
  imports: [MonetarySearchComponent, MonetaryTitleComponent, FormsModule],
  templateUrl: './monetary-form.component.html',
  styleUrl: './monetary-form.component.css'
})


export class MonetaryFormComponent implements OnInit  {
  movimiento:Movimiento = {
    fecha: "", tipoMovimiento: 'INGRESO', persona: '', concepto: '', importe: 0, motivo: '',
    clasificacion: '',
    idClasificacion: ''
  }
  clasificaciones:Clasificacion[] = []
  constructor(private monetaryServ:MonetaryService,private clasServ:ClasificacionService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.getClasificaciones();
  }

  private getClasificaciones() {
    this.clasServ.getClasificaciones().subscribe(clasificaciones => {
      this.clasificaciones = clasificaciones
    })
  }
  tipoDeMovimientoSelect(ev: any): "INGRESO" | "EGRESO" {
    return ev.target.value as ("INGRESO" | "EGRESO");
  }
  tipoDeClasificacionSelect(ev:any):string{
    return ev.target.value as string
  }
  receiveMovimiento(mov: Movimiento) {
    this.movimiento = mov;
  }

  cleanInputs(){
    this.movimiento.fecha = ""
    this.movimiento.persona = ""
    this.movimiento.concepto = ""
    this.movimiento.importe = 0
    this.movimiento.motivo = ""

  }

  handleErrors():string{
    let errorMessage = ""
    if (this.movimiento.fecha === "") errorMessage += "Fecha no puede estar vacia\n"
    if (this.movimiento.persona === "") errorMessage += "Persona no puede estar vacia\n"
    if (this.movimiento.concepto === "") errorMessage += "Concepto no puede estar vacia\n"
    if (this.movimiento.importe === 0 || this.movimiento.importe === null) errorMessage += "Importe no puede estar vacia\n"
    if (this.movimiento.motivo === "") errorMessage += "Motivo no puede estar vacia\n"
    if (this.movimiento.idClasificacion === "") errorMessage += "Clasificacion no puede estar vacia\n"
    return errorMessage
  }

  addMovimiento(){
    const idUsuario = JSON.parse(localStorage.getItem("usuarioPrimaria") as string).idUsuario
    const idEscuela = this.route.snapshot.queryParams['idEscuela']


    let newMovimiento:AddMovimientoReq = {
      ...this.movimiento,
      "idEscuela":idEscuela,
      "idUsuario":idUsuario
    }

    this.monetaryServ.addMovimiento(newMovimiento).subscribe({
      next:() => {
        alert("Movimiento agregado")
        this.cleanInputs()
      },
      error :(err)=> {
        alert(this.handleErrors())
      }
    })
  }
}
