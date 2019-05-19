import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { SchemeMasterModel } from "../app.SchemeModel";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SchemeMasterViewModel } from "../Models/app.SchemeViewModel";
import { SchemeDropdownModel } from "../Models/app.SchemeDropdownModel";
import { environment } from "src/app/Shared/environment";

@Injectable({
    providedIn: 'root'
})

export class SchemeService {
  // Field Properties
    private _component: string;
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/Scheme/";
    token: any;
    username: any;

  constructor(private http: HttpClient) {
        this._component = "SchemeService";
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
        this.username = this.data.username
    }

    // Save Scheme
    public SaveScheme(schemeMasterModel: SchemeMasterModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl, schemeMasterModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get All Scheme
    public GetAllScheme() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<SchemeMasterViewModel[]>(this.apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Get All Active Scheme List (SchemeDropdown)
    public GetAllActiveSchemeList() {
        var apiUrl = "	http://localhost:54354/api/SchemeDropdown/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<SchemeDropdownModel[]>(apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Get Scheme By ID
    public GetSchemeById(schemeId) {
        var editUrl = this.apiUrl + '/' + schemeId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<SchemeMasterViewModel>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Update Scheme
    public UpdateScheme(schemeMasterModel: SchemeMasterModel) {
        var putUrl = this.apiUrl + '/' + schemeMasterModel.SchemeID;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.put<any>(putUrl, schemeMasterModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Delete Scheme
    public DeleteScheme(schemeId) {
        var deleteUrl = this.apiUrl + '/' + schemeId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Private helper handleError function
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error(`[${this._component}] - An error occurred:`, error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
          console.error(`[${this._component}] - Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
      return throwError(`[${this._component}] - Something bad happened; please try again later.`);
    };
}
