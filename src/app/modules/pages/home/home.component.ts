import {Component, OnInit} from '@angular/core';
import { NavBarComponent } from '../../../core/header/nav-bar/nav-bar.component';
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movimiento} from "../monetary-register/Interfaces/MovimientoResponse";
import {dateNow} from "igniteui-angular-core";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent,CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  //VARIABLES
  mostrarIngresos: boolean = true; // Mostrar sección de ingresos por defecto
  mostrarEgresos: boolean = false;
  fechaInicio: string | undefined;
  fechaFin: string | undefined;
  idEscuela: string | undefined;
  movimientos: string[] = [];


  //Objetos
  http: HttpClient;

  showIngresos() {
    this.mostrarIngresos = true;
    this.mostrarEgresos = false;
  }

  showEgresos() {
    this.mostrarIngresos = false;
    this.mostrarEgresos = true;
  }

  ngOnInit() {
    this.fechaInicio = "2021-01-01";
    this.fechaFin = dateNow().toDateString();
    this.idEscuela = "1";
    this.showIngresos();
    this.ObtenerMovimientos(this.fechaInicio, this.fechaFin, this.idEscuela);
    console.log(this.movimientos);
  }
  constructor(http: HttpClient) {
    this.http = http;

  }

  ObtenerMovimientos(fechaInicio:string,fechaFin:string,idEscuela:string){
    //Consumir `http://localhost:8080/Movimientos/getReporte?fechaInicio=${fechaInicio}&fechaFinal=${fechaFin}&idEscuela=${idEscuela}} y guardarlo en this.movimientos
    this.http.get<string[]>(`http://localhost:8080/Movimientos/generateReport?fechaInicio=${fechaInicio}&fechaFinal=${fechaFin}&idEscuela=${idEscuela}`).subscribe((data) => {
      this.movimientos = data;
    });

  }

}

