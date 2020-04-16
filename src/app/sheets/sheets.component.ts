import { Component, OnInit } from '@angular/core';
import { Sheet } from '../sheet.model';
import { SheetService } from '../sheet.service'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss'],
})
export class SheetsComponent implements OnInit {

  sheets: Sheet[];

  constructor(private sheetService: SheetService, public apiService: ApiService) {
  }

  ngOnInit() {
    this.getSheets()
  }

  getSheets(): void {
    this.sheetService
      .load()
      .subscribe(sheets => this.sheets = sheets);
  }

}
