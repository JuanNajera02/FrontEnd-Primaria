import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Credential} from "./models/Credential";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url:string = "http://localhost:8080"
  constructor(private http:HttpClient) { }

  signIn(cred:Credential):Observable<any>{
      return this.http.post(`${this.url}/auth/authenticate`,cred)
  }
  //TODO
  signUp(){}

  isAuthenticated():boolean{
    console.log(localStorage.getItem("usuarioPrimaria"))
    return localStorage.getItem("usuarioPrimaria") !== null
  }
}
