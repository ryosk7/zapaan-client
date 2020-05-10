import { Component, OnInit, Input } from '@angular/core';
import { Sheet } from '../../models/sheet.model';
import { SheetService } from '../../services/sheet/sheet.service'
import { ApiService } from '../../services/api/api.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sheet-update',
  templateUrl: './sheet-update.component.html',
  styleUrls: ['./sheet-update.component.scss'],
})
export class SheetUpdateComponent implements OnInit {

  @Input() content: string;
  sheet: Sheet;

  constructor(
    private sheetService: SheetService,
    public apiService: ApiService,
    navParams: NavParams,
    public modalController: ModalController
  ) {
    this.sheet = navParams.get('sheet');
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss(true);
  }

  updateSheet(): void {
    this.sheetService
      .update( this.sheet  as Sheet)
      .subscribe(sheet => {
        this.save();
      });
  }

}
