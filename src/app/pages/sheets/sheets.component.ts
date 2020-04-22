import { Component, OnInit } from '@angular/core';
import { Sheet } from '../../models/sheet.model';
import { SheetService } from '../../services/sheet/sheet.service'
import { ApiService } from '../../services/api/api.service';
import { ModalController } from '@ionic/angular';
import { SheetCreateComponent } from '../sheet-create/sheet-create.component';
import { SheetUpdateComponent } from '../sheet-update/sheet-update.component';

@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss'],
})
export class SheetsComponent implements OnInit {

  sheets: Sheet[];

  mode = 'pomodoro';
  message: string;
  pomodoroCount = 0;

  constructor(
    private sheetService: SheetService,
    public apiService: ApiService,
    public modalController: ModalController
  ){
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
      count: sheet.count,
      start_time: sheet.start_time,
      current_time: sheet.current_time,
      finish_time: sheet.finish_time
    });
  }

  switchToPomodoro(): void {
    this.mode = 'pomodoro';
  }

  /**
   * Switches the timer mode to a short break. (5 mins)
   */
  switchToShortBreak(): void {
    this.mode = 'short';
  }

  /**
   * Switches the timer mode to a long break. (10 mins)
   */
  switchToLongBreak(): void {
    this.mode = 'long';
  }

  /**
   * Called on completion of the timer, passed the modal to be displayed.
   */
  onTimerComplete(): void {
    // Check what mode we are in to display a appropriate message in the modal.
    switch (this.mode) {
      case 'pomodoro':
        // Increment the counter.
        this.pomodoroCount += 1;
        if (this.pomodoroCount % 2 === 0) {
          this.message = 'Time to take a long break!';
        } else {
          this.message = 'Time to take a short break!';
        }
        break;
      case 'short':
        this.message = 'Time to get back to work!';
        break;
      case 'long':
        this.message = 'Time to get back to work!';
        break;
    }
    // Open the modal and then on close change the timer to the opposite mode. (Pomodoro -> Break etc.)
    // this.modalService.open(content).result.then((result) => this.onModalDismissed(), (reason) => this.onModalDismissed());
  }

  onModalDismissed() {
    if (this.mode === 'short' || this.mode === 'long') { // If we have just had a break, back to work.
      this.mode = 'pomodoro';
    } else if (this.mode === 'pomodoro' && this.pomodoroCount % 2 === 0) { // If we have worked 2 pomodoros then long break.
      this.mode = 'long';
    } else { // Else have a short break.
      this.mode = 'short';
    }
  }
}
