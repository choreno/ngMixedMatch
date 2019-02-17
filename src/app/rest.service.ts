import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

const endPoint = "http://localhost:3000/";
const httpOptions = {
  header: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class RestService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getMembers(): Observable<any> {
    return this.http.get(endPoint + 'Member').pipe(map(this.extractData)) ; 
  }
 

}
