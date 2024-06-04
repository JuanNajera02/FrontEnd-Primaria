import { Component } from '@angular/core';
import { NavBarComponent } from '../../../core/header/nav-bar/nav-bar.component';
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // VARIABLES
  mostrarIngresos: boolean = true; // Mostrar sección de ingresos por defecto
  mostrarEgresos: boolean = false;
  fechaInicio: string;
  fechaFin: string;
  idEscuela: string;

  // INFO
  movimientos: any[] = [];
  Escuela: any = {};

  // Objetos
  http: HttpClient;

  showIngresos() {
    this.mostrarIngresos = true;
    this.mostrarEgresos = false;
  }

  showEgresos() {
    this.mostrarIngresos = false;
    this.mostrarEgresos = true;
  }

  constructor(private route: ActivatedRoute, http: HttpClient) {
    this.http = http;

    this.fechaInicio = "2021-01-01";
    this.fechaFin = new Date().toISOString().split('T')[0];
    this.showIngresos();
    this.idEscuela = this.route.snapshot.queryParams['idEscuela'];
    this.ObtenerMovimientos(this.fechaInicio, this.fechaFin, this.idEscuela);
    this.ObtenerEscuela();
  }

  ObtenerMovimientos(fechaInicio:string,fechaFin:string,idEscuela:string){
    const api: string = `https://ingresosegresosback-production.up.railway.app/Movimientos/ingresosEgresosPorClasificacion?fechaInicio=${fechaInicio}&fechaFinal=${fechaFin}&idEscuela=${idEscuela}`;

    this.http.get<any[]>(api).subscribe((data) => {
      this.movimientos = data;
      console.log(this.movimientos);
    });
  }

  ObtenerEscuela(){
    const api: string = `https://ingresosegresosback-production.up.railway.app/escuelas/getEscuela?idEscuela=${this.idEscuela}`;

    this.http.get<any>(api).subscribe((data) => {
      this.Escuela = data;
      console.log(this.Escuela);
    });
  }

  calcularSumatoria(tipo: string): number {
    let sumatoria = 0;
    for (const movimiento of this.movimientos) {
      if (movimiento.tipo === tipo) {
        sumatoria += movimiento.value;
      }
    }
    return sumatoria;
  }

  buscar() {
    this.idEscuela = this.route.snapshot.queryParams['idEscuela'];
    this.ObtenerEscuela();
    this.ObtenerMovimientos(this.fechaInicio, this.fechaFin, this.idEscuela);
  }

  exportar() {
    // Crear un arreglo que combine los datos de movimientos y escuela
    const data = [
      [`FECHA INICIO: ${this.fechaInicio} FECHA FIN: ${this.fechaFin}`], // Rango de fechas
      [], // Agregar una fila vacía para separar los conjuntos de datos
      ["DATOS ESCUELA"], // Encabezado de la sección de escuela
      [ ...Object.keys(this.Escuela)], // Nombres de las propiedades de la escuela
      [...Object.values(this.Escuela)], // Valores de las propiedades de la escuela
      [], // Agregar una fila vacía para separar los conjuntos de datos
      ["Clasificación", "Ingreso", "Egreso"], // Encabezado de la sección de movimientos
      ...this.movimientos.map(movimiento => [movimiento.clasificacion, movimiento.ingreso, movimiento.egreso]),
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

  exportToPDF(): void {
    const doc = new jsPDF();

    // Título principal
    doc.setFontSize(14);
    doc.text("SEGUNDO Informe Financiero de las Asociaciones de Padres de Familia", 10, 10);
    doc.text("Ciclo escolar 2021 - 2022", 10, 18);

    // Encabezado de la escuela
    doc.setFontSize(12);
    doc.text(`Escuela: ${this.Escuela.nombre}`, 10, 30);
    doc.text(`Clave: ${this.Escuela.clave}`, 10, 40);
    doc.text(`Zona: ${this.Escuela.zona}`, 10, 50);
    doc.text(`Sector: ${this.Escuela.sector}`, 10, 60);
    doc.text(`Domicilio: ${this.Escuela.domicilio}`, 10, 70);
    doc.text(`Localidad: ${this.Escuela.localidad}`, 10, 80);
    doc.text(`Teléfono: ${this.Escuela.telefono}`, 10, 90);
    doc.text(`No. de Padre de Familia: ${this.Escuela.padreFamilia}`, 10, 100);
    doc.text(`Total de Alumnos: ${this.Escuela.totalAlumnos}`, 10, 110);
    doc.text(`Cuota de Padres de Familia: ${this.Escuela.cuotaPadres.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`, 10, 120);
    doc.text(`Total de Grupos: ${this.Escuela.totalGrupos}`, 10, 130);

    // Separador
    doc.line(10, 135, 200, 135);

    // Ingresos Económicos
    doc.setFontSize(14);
    doc.text("A. INGRESOS ECONÓMICOS", 10, 150);
    doc.setFontSize(12);
    doc.text(`Datos al Día: ${this.fechaFin}`, 10, 160);

    const ingresos = this.movimientos.filter(mov => mov.tipo === 'ingreso');
    let startY = 170;
    ingresos.forEach(ingreso => {
      doc.text(`${ingreso.clasificacion}: ${ingreso.ingreso.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`, 10, startY);
      startY += 10;
    });

    doc.setFontSize(12);
    doc.text(`TOTAL INGRESOS: ${this.calcularSumatoria('ingreso').toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`, 10, startY + 10);
    startY += 20;

    // Separador
    doc.line(10, startY, 200, startY);
    startY += 10;

    // Egresos Registrados
    doc.setFontSize(14);
    doc.text("B. EGRESOS REGISTRADOS", 10, startY);
    doc.setFontSize(12);
    doc.text(`Datos al Día: ${this.fechaFin}`, 10, startY + 10);

    const egresos = this.movimientos.filter(mov => mov.tipo === 'egreso');
    let egresosStartY = startY + 20;
    egresos.forEach(egreso => {
      doc.text(`${egreso.clasificacion}: ${egreso.egreso.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`, 10, egresosStartY);
      egresosStartY += 10;
    });

    doc.setFontSize(12);
    doc.text(`TOTAL EGRESOS: ${this.calcularSumatoria('egreso').toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`, 10, egresosStartY + 10);

    // Descargar el archivo PDF
    doc.save('reporte.pdf');
  }
}
