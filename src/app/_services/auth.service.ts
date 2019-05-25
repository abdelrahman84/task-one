import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'http://penta-test.com/knowledge_base/pentalibrary/public/api/login';
  errorData: {};

  constructor(private http: HttpClient) { }

 

  

  login(mobile: string, password: string) {
    return this.http.post<any>(this.serverUrl, {
      mobile: mobile, 
      password: password,
      "tele_code" :"+20",
      "lang_id":1,
      "device_token":"c0u7NmRxxGffgfeeAeewwPA91rbFPmiJX0BtuBU8ieXIPjBxREDdN3j0AOeIwEU-639vGWKkazzlA6AfFbchB2T5ojcdxqh3leb0EqGHdMC0VtLTDJ5VHgQBHctnZOhYtl4joM2FFX3mP5LaZycP7Z8Sr-vhQovWh_",
	    "mobile_os":"android"
    }).pipe(map(response => {
        var values = response.content[0].more[0].value
        var api_key = values.find(v => v.parameter == "api_token").value
        var device_token = values.find(v => v.parameter == "device_token").value
         localStorage.setItem('api_key', api_key);
         localStorage.setItem('device_token', device_token)
         console.log('api_key:'+api_key);
         console.log('device_token:'+device_token);
        
      }),
    )}
  

    isLoggedIn() {	
      if (localStorage.getItem('currentUser')) {	
       return true;	
     }	
     return false;	
   }
       
  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}