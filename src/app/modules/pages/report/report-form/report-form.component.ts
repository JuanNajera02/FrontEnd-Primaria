import {Component, OnInit} from '@angular/core';
import { ReportSearchComponent } from '../report-search/report-search.component';
import { ReportTitleComponent } from '../report-title/report-title.component';
import { GridchartComponent } from '../report-table/gridchart.component';
import {MonetaryService} from "../../monetary-register/monetary.service";
import {Movimiento} from "../../monetary-register/Interfaces/MovimientoResponse";

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [ReportSearchComponent,ReportTitleComponent,GridchartComponent],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent implements OnInit{

  //datos de prueba
  movimientos:Movimiento[] = []



  //columnas de prueba
  columns = [
    {
      key:'tipoMovimiento',
      title:'Tipo de movimiento'
    },
    {
      key:'persona',
      title:'Persona'
    },
    {
      key:'concepto',
      title:'Concepto'
    },
    {
      key:'importe',
      title:'Importe'
    },
    {
      key:'motivo',
      title:'Motivo'
    },
    {
      key:'clasificacion',
      title:'Clasificación'
    },
    {
      key:'fecha',
      title:'Fecha'
    }

  ];

  constructor(private monetServ:MonetaryService) {}

  ngOnInit(){


  }



}

