import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MonetaryService} from "../monetary.service";
import {Movimiento} from "../Interfaces/MovimientoResponse";

@Component({
  selector: 'app-monetary-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './monetary-search.component.html',
  styleUrl: './monetary-search.component.css'
})
export class MonetarySearchComponent {
  idMovimiento: string = "";

  @Output() movimientoEvent = new EventEmitter<Movimiento>
  constructor(private monetaryServ:MonetaryService) {}

  buscarMovimiento() {
    if (Number.parseInt(this.idMovimiento) < 0) return;
    this.monetaryServ.getMovimiento(this.idMovimiento).subscribe({
      next : (movimiento) => {
        console.log("mov",movimiento)
        this.movimientoEvent.emit(movimiento)
      },
      error: (error) => console.log(error.message)
    })
  }
}
