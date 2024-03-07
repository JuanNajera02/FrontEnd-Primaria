import {Component} from '@angular/core';
import { MonetarySearchComponent } from '../monetary-search/monetary-search.component';
import { MonetaryTitleComponent } from '../monetary-title/monetary-title.component';
import {MonetaryService} from "../monetary.service";
import {Movimiento} from "../Interfaces/MovimientoResponse";
import {AddMovimientoReq} from "../Interfaces/AddMovimientoReq";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-monetary-form',
  standalone: true,
  imports: [MonetarySearchComponent, MonetaryTitleComponent, FormsModule],
  templateUrl: './monetary-form.component.html',
  styleUrl: './monetary-form.component.css'
})
export class MonetaryFormComponent   {
  movimiento:Movimiento = {fecha: "", tipoMovimiento: 'INGRESO', persona: '', concepto: '', importe: 0, motivo: ''}
  constructor(private monetaryServ:MonetaryService) {}
  tipoDeMovimientoSelect(ev: any): "INGRESO" | "EGRESO" {
    return ev.target.value as ("INGRESO" | "EGRESO");
  }
  receiveMovimiento(mov: Movimiento) {
    this.movimiento = mov;
  }

  addMovimiento(){
    console.log("add movimiento")
    let newMovimiento:AddMovimientoReq = {
      ...this.movimiento,
      "idClasificacion":1,
      "idEscuela":4,
      "idUsuario":1
    }
    this.monetaryServ.addMovimiento(newMovimiento).subscribe(() => console.log("sucess"))
  }
}
