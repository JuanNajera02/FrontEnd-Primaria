import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class ClasificacionService {


    
  url:string = "http://localhost:8080"
  constructor(private http:HttpClient) { }

  crearClasificacion(newClasificacion:string):Observable<any>{
    // return this.http.get<any>(`${this.url}/clasificaciones/addClasificacion`)
    return this.http.post<any>(`${this.url}/clasificaciones/addClasificacion`,{nombre:newClasificacion})
  }
}