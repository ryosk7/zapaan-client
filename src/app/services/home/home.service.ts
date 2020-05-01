import { Injectable } from '@angular/core';
import { Sheet } from '../../models/sheet.model';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  url: string = 'sheets';
  constructor(public api: ApiService) { }

  load(): Observable<Sheet[]> {
    return this.api
      .get(this.url)
      .pipe(map(sheets => sheets.map(sheet => new Sheet(sheet))));
  }

  post(data: Sheet): Observable<any> {
    return this.api.post(this.url, data);
  }

  update(data: Sheet): Observable<any> {
    const id = typeof data === 'number' ? data : data.id;
    const url = `${this.url}/${id}`;
    return this.api.patch(url, data);
  }

  delete(data: Sheet | number): Observable<any> {
    const id = typeof data === 'number' ? data : data.id;
    const url = `${this.url}/${id}`;
    return this.api.delete(url);
  }
}
