import {Component, OnInit} from '@angular/core';
import { NavBarComponent } from '../../../core/header/nav-bar/nav-bar.component';
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";


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
    this.showIngresos();
    this.ObtenerMovimientos();
  }
  constructor(http: HttpClient) {
    this.http = http;
  }

 ObtenerMovimientos() {
      //   Consumir api getMovimientosByFechas:8080 FechaInicio, FechaFin,id escuela

     this.http.get('http://localhost:8080/getMovimientosByFechas?FechaInicio=2021-01-01&FechaFin=2021-12-31&idEscuela=1').subscribe((data: any) => {
      console.log(data);
     });


  }


}

