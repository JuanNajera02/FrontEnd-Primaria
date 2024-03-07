import { CUSTOM_ELEMENTS_SCHEMA, Component, Input,OnInit } from '@angular/core';
import { ApexGrid, ColumnConfiguration } from 'apex-grid';
ApexGrid.register();


@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [],
  templateUrl: './gridchart.component.html',
  styleUrl: './gridchart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class GridchartComponent implements OnInit{
   
  //Inputs para el componente
  @Input() columns!: ColumnConfiguration<any, keyof any>[];
  @Input() data!: any[];

  constructor() { 

  

  }

  ngOnInit(): void {
    console.log("columnas",this.columns);
    console.log("data",this.data);

  }


  ngOnChanges() {
    // console.log('GridchartComponent', this.columns, this.data);
    console.log("columnas",this.columns);
    console.log("data",this.data);

    if (this.columns.length > 0 && this.data.length === 0) {
      let objeto: any = {};
      this.columns.forEach((columna) => {
        objeto[columna.key] = '';
      });
      this.data.push(objeto);
    }
  }
}
