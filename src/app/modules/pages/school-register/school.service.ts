import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {School} from "./School";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  url:string = "http://localhost:8080"
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
}
