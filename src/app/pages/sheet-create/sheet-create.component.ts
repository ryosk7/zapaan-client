import { Component, OnInit } from '@angular/core';
import { Sheet } from '../../models/sheet.model';
import { SheetService } from '../../services/sheet/sheet.service'
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-sheet-create',
  templateUrl: './sheet-create.component.html',
  styleUrls: ['./sheet-create.component.scss'],
})
export class SheetCreateComponent implements OnInit {

  sheet: Sheet;

  constructor(private sheetService: SheetService, public apiService: ApiService) {
  }

  ngOnInit() {}

  createSheet(content: string): void {
    console.log('hoge: ', content);
    this.sheetService
      .post({content} as Sheet)
      .subscribe(sheet => {
      });
  }
}
