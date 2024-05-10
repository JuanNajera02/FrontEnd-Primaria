import { Component, Input } from '@angular/core';
import { School } from '../School';
import { SchoolService } from '../school.service';


@Component({
  selector: 'app-assigned-schools-list',
  standalone: true,
  imports: [],
  templateUrl: './assigned-schools-list.component.html',
  styleUrl: './assigned-schools-list.component.css'
})
export class AssignedSchoolsListComponent {
  @Input() escuelasAsignadas:School[] = []

  constructor(private schoolServ:SchoolService) { }


  desAsignarEscuela(idEscuela: string) {
    const id_usuario:string = JSON.parse(localStorage.getItem("usuarioPrimaria") as string).idUsuario
    console.log("id_usuario",id_usuario)
    console.log("idEscuela",idEscuela)
    this.schoolServ.desAsignarEscuela(id_usuario, idEscuela).subscribe({
      next: (response) => {
        alert("Escuela desasignada correctamente")
      },
      error: (error) => alert(error.message)
    })

  }

}
