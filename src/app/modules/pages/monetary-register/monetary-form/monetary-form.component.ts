import { Component } from '@angular/core';
import { MonetarySearchComponent } from '../monetary-search/monetary-search.component';
import { MonetaryTitleComponent } from '../monetary-title/monetary-title.component';

@Component({
  selector: 'app-monetary-form',
  standalone: true,
  imports: [MonetarySearchComponent,MonetaryTitleComponent],
  templateUrl: './monetary-form.component.html',
  styleUrl: './monetary-form.component.css'
})
export class MonetaryFormComponent {
  
  tipoDeMovimiento:string = ""

  tipoDeMovimientoSelect(ev:any) {
    this.tipoDeMovimiento = ev.target.value;
  }

}
