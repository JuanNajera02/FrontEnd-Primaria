import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {School} from "./School";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  // url:string = "https://ingresosegresosback-production.up.railway.app"
  url:string = "https://ingresosegresosback-production.up.railway.app"
  constructor(private http:HttpClient) { }

  getEscuelas(username:string):Observable<School[]>{
    return this.http.get<School[]>(`${this.url}/escuelas/getEscuelas?username=${username}`)
  }

  getEscuela(idEscuela:string):Observable<School>{
    return this.http.get<School>(`${this.url}/escuelas/getEscuela?idEscuela=${idEscuela}`)
  }

  registrarEscuela(escuela:School):Observable<any>{
    return this.http.post(`${this.url}/escuelas/addEscuela`,escuela);
  }

  getAllEscuelas():Observable<School[]>{
    return this.http.get<School[]>(`${this.url}/escuelas/getAllEscuelas`);
  }

  asignarEscuela(idUsuario: string, idEscuela: string): Observable<any> {
    return this.http.post(`${this.url}/asignacionEscuela/addAsignacionEscuela`, {
      id_escuela: {
        id: parseInt(idEscuela) // Convertir a número si es necesario
      },
      id_usuario: {
        id: parseInt(idUsuario) // Convertir a número si es necesario
      }
    });
  }
  desAsignarEscuela(idUsuario:string,idEscuela: string): Observable<any> {
    // /asignacionEscuela/deleteAsignacionEscuela?idEscuela=9&idUsuario=2
    return this.http.delete(`${this.url}/asignacionEscuela/deleteAsignacionEscuela?idEscuela=${idEscuela}&idUsuario=${idUsuario}`)
  }

  //https://ingresosegresosback-production.up.railway.app/asignacionEscuela/getAsignacionEscuela?username=1
  getAsignacionEscuela(username:string):Observable<any>{
    return this.http.get(`${this.url}/asignacionEscuela/getAsignacionEscuela?username=${username}`)
  }


}
