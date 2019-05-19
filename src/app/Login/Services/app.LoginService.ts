import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginModel } from '../Models/app.LoginModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// LoginService service class
export class LoginService {
  // Field Properties
  private _component: string;
  public token: string;
  private apiUrl = "	http://localhost:54354/api/Authenticate/";

  // Constructor
  constructor(private _http: HttpClient, private _Route: Router) {
    this._component = "LoginService";
  }

  // Function Methods - validateLoginUser function
  // POST: 
  public validateLoginUser(loginmodel: LoginModel) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<any>(this.apiUrl, loginmodel, { headers: headers })
      .pipe(tap(data => {
        console.log(data);

        if (data.Token != null) {
          if (data.Usertype == "2") {
            // Store Username and Jason Web Token (Jwt) token in local storage to keep Current User logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ username: loginmodel.Username, token: data.Token }));
          }
          else if (data.Usertype == "1") {
            // Store Username and Jason Web Token (Jwt) token in local storage to keep Admin User logged in between page refreshes
            localStorage.setItem('AdminUser', JSON.stringify({ username: loginmodel.Username, token: data.Token }));
          }
          // Return true to indicate successful login
          return data;
        } else {
          // Return false to indicate failed login
          return null;
        }
      }),
        catchError(this.handleError)
      );
  }

  // Function Methods - LogoutUser function
  LogoutUser() {
    localStorage.removeItem('currentUser');
  }

  // Function Methods - Private helper handleError function
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`[${this._component}] - A client-side or network error occurred: ` + `.`, error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`[${this._component}] - The backend returned code: '${error.status}', ` + `and the body was: ${error.error}.`);
    }
    // Return an observable with a user-facing friendly error message.
    return throwError(`[${this._component}] - Something bad happened. Please try again later. Alernatively, report the error to your system administrator.`);
  };
}
