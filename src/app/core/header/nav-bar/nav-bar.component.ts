import {Component, OnInit} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {School} from "../../../modules/pages/school-register/School";
import {SchoolService} from "../../../modules/pages/school-register/school.service";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatToolbarModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  selectedValueRegister:string = "Registrar"
  escuelas:School[] = []

  constructor(private route:Router,private schoolServ:SchoolService,private routeActivated:ActivatedRoute) {
  }

  ngOnInit(): void {

    this.getEscuelas()
  }
  hasIdEscuela():boolean{
    const params = this.routeActivated.snapshot.queryParams
    console.log("params",params)
    return params.hasOwnProperty('idEscuela') && params['idEscuela'] !== ''
  }
  onSelectedRegister(event:any){
      this.selectedValueRegister = event.target.value as string
    this.selectedValueRegister = this.selectedValueRegister.toLowerCase()
    if(!this.hasIdEscuela() && this.selectedValueRegister !== 'escuelas'){
      alert("Elige una escuela")
      return
    }
    const idEscuela = this.routeActivated.snapshot.queryParams['idEscuela']
    const queryParams = {idEscuela}
    this.route.navigate(["/" + this.selectedValueRegister],{queryParams})

  }

  salir(){
    localStorage.removeItem("usuarioPrimaria")
    this.route.navigate(["/login"])
  }

  getEscuelas(){
    const username:string = JSON.parse(localStorage.getItem("usuarioPrimaria") as string).usuario

    this.schoolServ.getEscuelas(username).subscribe({
      next:(schools) => this.escuelas = schools,
      error: (err) => console.log(err.message)
    })
  }

  onSelectEscuela($event: any) {
    const idEscuela:string =  $event.target.value
    const queryParams = { idEscuela };

    this.route.navigate([], { queryParams });
  }
}
