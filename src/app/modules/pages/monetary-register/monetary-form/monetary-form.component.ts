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
      console.log(clasificaciones)
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

  addMovimiento(){
    const idUsuario = JSON.parse(localStorage.getItem("usuarioPrimaria") as string).idUsuario
    const idEscuela = this.route.snapshot.params['idEscuela']
    let newMovimiento:AddMovimientoReq = {
      ...this.movimiento,
      "idEscuela":idEscuela,
      "idUsuario":idUsuario
    }
    this.monetaryServ.addMovimiento(newMovimiento).subscribe(() => console.log("se agrego un movimiento correctamente"))
  }
}
