import { CommonModule } from '@angular/common';
import {  Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import {MonetaryService} from "../../monetary-register/monetary.service";

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

  constructor(private monetServ:MonetaryService) { }

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


  clearFilters(): void {
    this.filterValue = '';
    this.applyFilters();
  }

  consultar() {

    if (this.fechaInicio > this.fechaFinal) {
      alert('La fecha de inicio no puede ser mayor a la fecha final');
      return;
    }
    // '2023-11-23','2024-02-08'
    this.monetServ.getMovimientosByFechas(this.fechaInicio.toString(),this.fechaFinal.toString()).subscribe((movimientos)=> {
      this.data = movimientos;
      this.data.forEach((movimiento) => movimiento.fecha = new Date(movimiento.fecha).toLocaleDateString())
      this.filteredData = this.data;
    });

  }
}
