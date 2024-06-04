import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movimiento} from "./Interfaces/MovimientoResponse";
import {AddMovimientoReq} from "./Interfaces/AddMovimientoReq";

@Injectable({
  providedIn: 'root'
})
export class MonetaryService {

  url:string = "https://ingresosegresosback-production.up.railway.app"
  constructor(private http:HttpClient) { }

  getMovimiento(idMovimiento:string,idEscuela:string):Observable<Movimiento>{
    return this.http.get<Movimiento>(`${this.url}/Movimientos/getMovimiento?idMovimiento=${idMovimiento}&idEscuela=${idEscuela}`)
  }

  addMovimiento(addMovimientoReq:AddMovimientoReq):Observable<any>{

    return this.http.post(`${this.url}/Movimientos/addMovimiento`,addMovimientoReq)

  }

  getMovimientosByFechas(fechaInicio:string,fechaFin:string,idEscuela:string):Observable<Movimiento[]>{
    return this.http.get<Movimiento[]>(`${this.url}/Movimientos/getMovimientosByFechas?fechaInicio=${fechaInicio}&fechaFinal=${fechaFin}&idEscuela=${idEscuela}`)
  }

}
