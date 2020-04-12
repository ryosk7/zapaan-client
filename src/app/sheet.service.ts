import { Injectable } from '@angular/core';
import { Sheet } from './sheet';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  private sheetUrl = 'http://localhost:3000/todos';
  constructor(private http: HttpClient) { console.log(this.getSheets())}

  getSheets(): Observable<Sheet[]> {
    return this.http.get<Sheet[]>(this.sheetUrl)
  }
}
