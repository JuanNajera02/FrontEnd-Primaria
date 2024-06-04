import {Component} from '@angular/core';
import { NavBarComponent } from '../../../core/header/nav-bar/nav-bar.component';
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import * as XLSX from "xlsx";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent{
  //VARIABLES
  mostrarIngresos: boolean = true; // Mostrar sección de ingresos por defecto
  mostrarEgresos: boolean = false;
  fechaInicio: string ;
  fechaFin: string ;
  idEscuela: string ;

  //INFO
  movimientos: any[] = [];
  Escuela: any = {};

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

  constructor(private route: ActivatedRoute,http: HttpClient) {
    this.http = http;

    this.fechaInicio = "2021-01-01";
    //this.fechaFin = dateNow() con formato yyyy-mm-dd
    this.fechaFin = new Date().toISOString().split('T')[0];
    this.showIngresos();
    this.idEscuela = this.route.snapshot.queryParams['idEscuela'];
    this.ObtenerMovimientos(this.fechaInicio, this.fechaFin, this.idEscuela);
    this.ObtenerEscuela();

  }

  ObtenerMovimientos(fechaInicio:string,fechaFin:string,idEscuela:string){
    const api: string = `http://localhost:8080/Movimientos/ingresosEgresosPorClasificacion?fechaInicio=${fechaInicio}&fechaFinal=${fechaFin}&idEscuela=${idEscuela}`;

    this.http.get<string[]>(api).subscribe((data) => {
      this.movimientos = data;
      console.log(this.movimientos);
    });

  }

  ObtenerEscuela(){
    const api: string = `http://localhost:8080/escuelas/getEscuela?idEscuela=${this.idEscuela}`;

    this.http.get<any>(api).subscribe((data) => {
      this.Escuela = data;
      console.log(this.Escuela);
    });
  }

  calcularSumatoria(tipo: string): number {
    let sumatoria = 0;
    for (const key in this.movimientos) {
      if (this.movimientos.hasOwnProperty(key)) {
        const value = this.movimientos[key][tipo];
        sumatoria += value;
      }
    }
    return sumatoria;
  }

  buscar(){
    this.idEscuela = this.route.snapshot.queryParams['idEscuela'];
    this.ObtenerEscuela();
    this.ObtenerMovimientos(this.fechaInicio, this.fechaFin, this.idEscuela);
  }

  exportar(){
    // Crear un arreglo que combine los datos de movimientos y escuela
    const data = [
      [`FECHA INICIO ${this.fechaInicio} FECHA FIN ${this.fechaFin}`], // Rango de fechas
      [], // Agregar una fila vacía para separar los conjuntos de datos
      ["DATOS ESCUELA"], // Encabezado de la sección de escuela
      [ ...Object.keys(this.Escuela)], // Nombres de las propiedades de la escuela
      [...Object.values(this.Escuela)], // Valores de las propiedades de la escuela
      [], // Agregar una fila vacía para separar los conjuntos de datos
      ["Clasificacion", "Ingreso", "Egreso"], // Encabezado de la sección de movimientos
      ...Object.entries(this.movimientos).map(([clasificacion, { ingreso, egreso }]) => [clasificacion, ingreso, egreso]),
    ];
    // Convertir el arreglo de arreglos a una hoja de cálculo de Excel
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    // Crear un nuevo libro de trabajo de Excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Agregar la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    // Guardar el libro de trabajo como un archivo Excel
    XLSX.writeFile(wb, 'reporte_datos.xlsx');
  }


}


