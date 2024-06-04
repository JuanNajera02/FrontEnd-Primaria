import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Credential} from "./models/Credential";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // url:string = "http://ingresosegresosback-production.up.railway.app"
  url:string = "https://ingresosegresosback-production.up.railway.app"
  
  constructor(private http:HttpClient) { }

  signIn(cred:Credential):Observable<any>{
      console.log("cred",cred)
      return this.http.post(`${this.url}/auth/authenticate`,cred)
  }
  //TODO
  signUp(){}

  isAuthenticated():boolean{
    return localStorage.getItem("usuarioPrimaria") !== null
  }
}
