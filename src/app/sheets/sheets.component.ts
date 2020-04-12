import { Component, OnInit } from '@angular/core';
import { Sheet } from '../Sheet';
import { SheetService } from '../sheet.service'

@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss'],
})
export class SheetsComponent implements OnInit {

  sheets: Sheet[];

  constructor(private sheetService: SheetService) {
    // console.log(this.getSheets());
  }

  ngOnInit() {
    this.getSheets();
  }

  getSheets(): void {
    this.sheetService.getSheets()
      .subscribe(sheets => this.sheets = sheets);
  }

}
