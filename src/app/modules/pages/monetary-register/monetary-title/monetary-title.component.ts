import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-monetary-title',
  standalone: true,
  imports: [],
  templateUrl: './monetary-title.component.html',
  styleUrl: './monetary-title.component.css'
})
export class MonetaryTitleComponent {

  @Input() nombreEscuela:string = "Escuela de Prueba"; 

}
