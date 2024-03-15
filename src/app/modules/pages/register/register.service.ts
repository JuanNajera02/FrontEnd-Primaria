import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { URL } from '../../../url';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }


  registerUser(user:any):Observable<any>{
    return this.http.post(`${URL}/auth/register`,user)
  }



}
