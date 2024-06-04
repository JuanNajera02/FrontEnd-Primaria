import { CommonModule } from '@angular/common';
import {  Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import {MonetaryService} from "../../monetary-register/monetary.service";
import {ActivatedRoute} from "@angular/router";
import {saveAs} from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {HttpClient} from "@angular/common/http";



interface Column {
  key: string;
  title: string;
  sort?: boolean;
}

@Component({
  selector: 'app-report-table',
  standalone: true,
  templateUrl: './gridchart.component.html',
  styleUrls: ['./gridchart.component.scss'],
  imports: [CommonModule, FormsModule]

})

export class GridchartComponent implements OnInit {
  @Input() columns!: Column[];
  data!: any[];
  fechaInicio: Date = new Date();
  fechaFinal: Date = new Date();
  filteredData: any[] = [];
  filterValue: string = '';
  movimientos: any[] = [];
  Escuela: any = {};

  constructor(
    private monetServ:MonetaryService,
    private route:ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  applyFilters(): void {
    console.log("applyFilters",this.filterValue)
    if (!this.filterValue) {
      this.filteredData = this.data;
      return;
    }

    this.filteredData = this.data.filter(item => {
      for (const column of this.columns) {
        const cellValue = item[column.key];
        if (cellValue && cellValue.toString().toLowerCase().includes(this.filterValue.toLowerCase())) {

          return true;

        }
      }
      return false;
    });
  }
  // Método para generar y descargar el archivo Excel con los datos filtrados
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'reporte_filtrado.xlsx');
  }
  // Método para obtener los movimientos
  ObtenerMovimientos(fechaInicio: string, fechaFin: string, idEscuela: string): void {
    const api: string = `https://ingresosegresosback-production.up.railway.app/Movimientos/ingresosEgresosPorClasificacion?fechaInicio=${fechaInicio}&fechaFinal=${fechaFin}&idEscuela=${idEscuela}`;
    this.http.get<any[]>(api).subscribe((data) => {
      this.movimientos = data;
      console.log(this.movimientos);
    });
  }
  // Método para obtener los datos de la escuela
  ObtenerEscuela(idEscuela: string): void {
    const api: string = `https://ingresosegresosback-production.up.railway.app/escuelas/getEscuela?idEscuela=${idEscuela}`;
    this.http.get<any>(api).subscribe((data) => {
      this.Escuela = data;
      console.log(this.Escuela);
    });
  }
  
  exportToPDF(): void {
    const doc = new jsPDF();

    // Añadir encabezado de la escuela
    doc.setFontSize(12);
    doc.text(`Escuela: ${this.Escuela.nombre}`, 10, 10);
    doc.text(`Clave: ${this.Escuela.clave}`, 10, 20);
    doc.text(`Zona: ${this.Escuela.zona}`, 10, 30);
    doc.text(`Sector: ${this.Escuela.sector}`, 10, 40);
    doc.text(`Domicilio: ${this.Escuela.domicilio}`, 10, 50);
    doc.text(`Localidad: ${this.Escuela.localidad}`, 10, 60);
    doc.text(`Teléfono: ${this.Escuela.telefono}`, 10, 70);
    doc.text(`No. de Padre de Familia: ${this.Escuela.padreFamilia}`, 10, 80);
    doc.text(`Total de Alumnos: ${this.Escuela.totalAlumnos}`, 10, 90);
    doc.text(`Cuota de Padres de Familia: ${this.Escuela.cuotaPadres}`, 10, 100);
    doc.text(`Total de Grupos: ${this.Escuela.totalGrupos}`, 10, 110);

    // Añadir tabla de ingresos
    doc.text(`A. INGRESOS ECONÓMICOS`, 10, 130);
    const ingresos = this.movimientos.filter(mov => mov.tipo === 'ingreso');
    let startY = 140;
    ingresos.forEach(ingreso => {
        doc.text(`${ingreso.descripcion}: ${ingreso.monto}`, 10, startY);
        startY += 10; // Incrementa la posición Y para la próxima línea
    });

    // Añadir tabla de egresos
    doc.text(`B. EGRESOS REGISTRADOS`, 10, startY + 20);
    const egresos = this.movimientos.filter(mov => mov.tipo === 'egreso');
    egresos.forEach(egreso => {
        doc.text(`${egreso.descripcion}: ${egreso.monto}`, 10, startY + 30);
        startY += 10; // Incrementa la posición Y para la próxima línea
    });

    // Descargar el archivo PDF
    doc.save('reporte.pdf');
}

  clearFilters(): void {
    this.filterValue = '';
    this.applyFilters();
  }

  consultar() {

    if (this.fechaInicio > this.fechaFinal) {
      alert('La fecha de inicio no puede ser mayor a la fecha final');
      return;
    }

    const idEscuela = this.route.snapshot.queryParams['idEscuela']


    this.monetServ.getMovimientosByFechas(this.fechaInicio.toString(),this.fechaFinal.toString(),idEscuela).subscribe((movimientos)=> {
      this.data = movimientos;
      this.data.forEach((movimiento) => movimiento.fecha = new Date(movimiento.fecha).toLocaleDateString())
      this.filteredData = this.data;
    });

  }
}
