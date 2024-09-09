import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData =new BehaviorSubject (null);

  constructor(private _HttpClient: HttpClient,private _Router:Router) {
    if(localStorage.getItem('token') !== null){
      this.decodeUserData();
    }
   }

  decodeUserData() {
    let encodeToken = JSON.stringify(localStorage.getItem('token'));
    let decodeToken:any = jwtDecode(encodeToken)
    console.log("decodeToken", decodeToken);
    this.userData.next( decodeToken);


  }


  logOut(){
    localStorage.removeItem('token')
    this.userData.next(null)
    this._Router.navigate(['/login']);

  }
  register(userData: object): Observable<any> {

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userData)

  }

  login(userData: object): Observable<any> {

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData)

  }



}