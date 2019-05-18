import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AssignRemoveModel } from '../Models/AssignRemoveModel';
import { AssignRolesViewModel } from '../Models/AssignRolesViewModel';
import { environment } from 'src/app/Shared/environment';

@Injectable({
  providedIn: 'root'
})

// AssignandRemoveRoleService service class
export class AssignandRemoveRoleService {
  // Field Properties
  private data: any;
  private apiUrl = environment.apiEndpoint + "/api/CreateRole/";
  token: any;
  username: any;

  // Constructor
  constructor(private http: HttpClient) {
    this.data = JSON.parse(localStorage.getItem('AdminUser'));
    this.token = this.data.token;
  }

  // Function Methods - Get All Users: GetAllAssignedRoles function
  // GET: 
  public GetAllAssignedRoles() {
    let apiUrl = "	http://localhost:54354/api/AssignRoles/";
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.get<AssignRolesViewModel[]>(apiUrl, { headers: headers }).pipe(tap(data => data),
      catchError(this.handleError)
    );
  }

  // Function Methods - AssignRolefunction
  // POST: 
  public AssignRole(assignmodel: AssignRemoveModel) {
    let apiUrl = "	http://localhost:54354/api/AssignRoles/";
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.post<any>(apiUrl, assignmodel, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Function Methods - RemoveRole function
  // POST: 
  public RemoveRole(assignmodel: AssignRemoveModel) {
    let apiUrl = "	http://localhost:54354/api/RemoveRole/";
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.post<any>(apiUrl, assignmodel, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Function Methods - Private helper handleError function
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client-side or network error occurred: ' + `.`, error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`The backend returned code: '${error.status}', ` + `and the body was: ${error.error}.`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later. Alernatively, report the error to your system administrator.');
  };
}
