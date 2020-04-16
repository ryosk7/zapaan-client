import { Injectable } from '@angular/core';
import { Sheet } from '../app/sheet.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  url: string = 'todos';
  constructor(public api: ApiService) {}

  load(): Observable<Sheet[]> {
    return this.api
      .get(this.url)
      .pipe(map(sheets => sheets.map(sheet => new Sheet(sheet))));
  }
}
