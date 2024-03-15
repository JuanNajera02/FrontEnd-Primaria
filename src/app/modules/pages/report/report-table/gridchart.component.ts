import { CommonModule } from '@angular/common';
import {  Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

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
  @Input() data!: any[];

  filteredData: any[] = [];
  filterValue: string = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredData = this.data;
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
}
