import { Component, OnInit } from '@angular/core';
import { Sheet } from '../../models/sheet.model';
import { SheetService } from '../../services/sheet/sheet.service'
import { ApiService } from '../../services/api/api.service';
import { ModalController } from '@ionic/angular';
import { SheetCreateComponent } from '../sheet-create/sheet-create.component';
import { SheetUpdateComponent } from '../sheet-update/sheet-update.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  sheets: Sheet[];

  constructor(
    private sheetService: SheetService,
    public apiService: ApiService,
    public modalController: ModalController
  ) { 
  }

  ngOnInit() {
    this.getSheets();
  }

  getSheets(): void {
    this.sheetService
      .load()
      .subscribe(sheets => this.sheets = sheets);
  }

  delete(sheet: Sheet): void {
    this.sheets = this.sheets.filter(s => s !== sheet);
    this.sheetService.delete(sheet).subscribe(sheet => {
      this.getSheets();
    });
  }

  async goToCreateSheet() {
    const modal = await this.modalController.create({
      component: SheetCreateComponent
    });
    modal.onDidDismiss().then(res => {
      if (res && res.data !== null && res.data == true) {
        this.getSheets();
      }
    });
    return await modal.present();
  }

  async goToUpdateSheet(sheet: Sheet) {
    const modal = await this.modalController.create({
      component: SheetUpdateComponent,
      componentProps: {
        'sheet': this.buildSheet(sheet)
      }
    });
    modal.onDidDismiss()
      .then((res) => {
        if (res && res.data !== null && res.data == true) {
          this.getSheets();
        }
      })
    return await modal.present();
  }

  buildSheet(sheet: Sheet): Sheet {
    return new Sheet({
      id: sheet.id,
      content: sheet.content,
      time: sheet.time
    });
  }

}
