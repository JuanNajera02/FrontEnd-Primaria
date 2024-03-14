import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MonetaryService} from "../monetary.service";
import {Movimiento} from "../Interfaces/MovimientoResponse";
import {ActivatedRoute} from "@angular/router";

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
  constructor(private monetaryServ:MonetaryService,private route:ActivatedRoute) {}

  buscarMovimiento() {
    if (Number.parseInt(this.idMovimiento) < 0) return;
    const idEscuela = this.route.snapshot.queryParams['idEscuela']

    this.monetaryServ.getMovimiento(this.idMovimiento,idEscuela).subscribe({
      next : (movimiento) => {
        this.movimientoEvent.emit(movimiento)
      },
      error: (error) => alert(error.error.message)
    })
  }
}
