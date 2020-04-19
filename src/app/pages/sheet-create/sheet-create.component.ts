import { Component, OnInit } from '@angular/core';
import { Sheet } from '../../models/sheet.model';
import { SheetService } from '../../services/sheet/sheet.service'
import { ApiService } from '../../services/api/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sheet-create',
  templateUrl: './sheet-create.component.html',
  styleUrls: ['./sheet-create.component.scss'],
})
export class SheetCreateComponent implements OnInit {

  sheet: Sheet;

  constructor(private sheetService: SheetService, public apiService: ApiService, public modalController: ModalController) {
  }

  ngOnInit() {}

  createSheet(content: string): void {
    this.sheetService
      .post({content} as Sheet)
      .subscribe(sheet => {
        this.save();
      });
  }

  dismiss(): void {
    this.modalController.dismiss();
  }

  save(): void {
    this.modalController.dismiss(true);
  }
}
