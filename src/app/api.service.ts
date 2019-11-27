import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io";
  private communities=[];
  private homes=[];
  results=[];
  constructor(private httpClient: HttpClient) {
    this.results = [];
   }

  public getCommunityService()
  {
    return this.httpClient.get(this.SERVER_URL+"/communities").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  
  
  public getHomeService()
  {
    return this.httpClient.get(this.SERVER_URL+"/homes").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}