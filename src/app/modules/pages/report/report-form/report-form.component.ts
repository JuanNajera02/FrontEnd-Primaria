import { Component } from '@angular/core';
import { ReportSearchComponent } from '../report-search/report-search.component';
import { ReportTitleComponent } from '../report-title/report-title.component';
import { GridchartComponent } from '../report-table/gridchart.component';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [ReportSearchComponent,ReportTitleComponent,GridchartComponent],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent {

  //datos de prueba
  data = [
    {
      id: 1,
      name: 'Leanne Graham'
    },
    {
      id: 2,
      name: 'Ervin Howell'
    },
    {
      id: 3,
      name: 'Clementine Bauch'
    },
    {
      id: 4,
      name: 'Patricia Lebsack'
    },
    {
      id: 5,
      name: 'Chelsey Dietrich'
    }
  ];

  //columnas de prueba
  columns = [
    {
      key: 'id',
      title: 'ID',
      sort: true
    },
    {
      key: 'name',
      title: 'Nombre'
    }
  ];

  constructor() { 
    

  }



}
