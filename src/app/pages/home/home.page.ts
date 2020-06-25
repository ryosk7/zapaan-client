import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Sheet } from '../../models/sheet.model';
import { SheetService } from '../../services/sheet/sheet.service'
import { ApiService } from '../../services/api/api.service';
import { ModalController } from '@ionic/angular';
import { SheetCreateComponent } from '../sheet-create/sheet-create.component';
import { SheetUpdateComponent } from '../sheet-update/sheet-update.component';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @Input() m: number;
  @Input() s: number;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onComplete: EventEmitter<any> = new EventEmitter();

  running = false;
  value = [25, 0];
  subscription: Subscription;
  sheets: Sheet[];
  isBreak: boolean = false;
  isPushedBreak: boolean = false;
  pomodoroCount: number = 0;

  selectedSheet: Sheet;
  beforeSelectedSheet: Sheet;

  constructor(
    private sheetService: SheetService,
    public apiService: ApiService,
    public modalController: ModalController,
    private tokenService: AngularTokenService
  ) { }

  ngOnInit(): void {

    this.tokenService.processOAuthCallback();
    this.tokenService.validateToken();
    this.getSheets();
    if (this.m) {
      this.value[0] = this.m;
    } else {
      this.m = 25;
    }
    if (this.s) {
      this.value[1] = this.s;
    } else {
      this.s = 0;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startTimer(): void {
    if (!this.running) {
      // Set running to true.
      this.value = [25, 0];
      this.running = true;
      this.selectSheetTimer(this.selectedSheet);
      // Check if the timer is comeplete and if so reset it before starting.
      if (this.isBreak == false && this.value[0] === 0 && this.value[1] === 0) {
        this.breakStartTimer();
      }
      // Create Rxjs interval to call a update method every second.
      this.subscription = interval(1000).subscribe(x => this.updateTimer());
    }
  }

  breakStartTimer(): void {
    this.isPushedBreak = true;
    if (this.pomodoroCount % 4 === 0) {
      this.value = [15, 0];
    } else {
      this.value = [5, 0];
    }
    if (!this.running) {
      // Set running to true.
      this.running = true;
      // Check if the timer is comeplete and if so reset it before starting.
      if (this.value[0] === 0 && this.value[1] === 0) {
        this.resetTimer();
      }
      // Create Rxjs interval to call a update method every second.
      this.subscription = interval(1000).subscribe(x => this.updateTimer());
    }
  }

  stopTimer(): void {
    if (this.running) {
      // Set running to false.
      this.running = false;
      // If we want to stop the timer then unsubscribe from the interval.
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }

  selectSheetTimer(sheet: Sheet): void {
    if (this.running && this.beforeSelectedSheet != null && this.beforeSelectedSheet != sheet) {
      this.proguressSheetTimeRecord(this.beforeSelectedSheet);
    }
    this.selectedSheet = sheet;
    this.beforeSelectedSheet = this.selectedSheet;
    if (this.running && sheet.isFirstGoOnSheet()) {
      this.selectedSheet.start_time = this.currentDateTimeToString();
      this.updateSheet(this.selectedSheet);
    }
  }

  proguressSheetTimeRecord(sheet: Sheet): void {
    const currentSheet = this.buildSheet(sheet);
    currentSheet.current_time = this.currentDateTimeToString();
    this.updateSheet(currentSheet);
  }

  currentDateTimeToString(): string {
    let currentDateTime = new Date();
    // FIXME: サーバー側でやりたい
    // 9時間追加する
    const milliSeconds = currentDateTime.setHours(currentDateTime.getHours() + 9);
    currentDateTime = new Date(milliSeconds);
    return currentDateTime.toString();
  }

  resetTimer(): void {
    // Set the minutes and seconds back to their original values.
    this.stopTimer();
    this.value = [this.m, this.s];
  }

  updateTimer(): void {
    if (this.running) {
      // Check if the timer is comeplete and if so stop the timer and run onComplete().
      if (this.isBreak == false && this.value[0] === 0 && this.value[1] === 0) {
        this.stopTimer();
        this.proguressSheetTimeRecord(this.selectedSheet);
        this.pomodoroCount += 1;
        this.isBreak = true;
        this.goToCreateSheet();
        // Make a sound/send an alert.
        this.onComplete.emit();
      } else if (this.isBreak == true && this.value[0] === 0 && this.value[1] === 0) {
        // Break Timeのときはカウントしない
        this.stopTimer();
        this.isBreak = true;
        if (this.isPushedBreak) {
          this.isPushedBreak = false;
          this.isBreak = false;
        }
      } else if (this.value[0] !== 0 && this.value[1] === 0) {
        this.value = [this.value[0] - 1, 59];
      } else if (this.value[1] !== 0) {
        this.value = [this.value[0], this.value[1] - 1];
      }
    }
  }

  getSheets(): void {
    this.sheetService
      .load()
      .subscribe(sheets => this.sheets = sheets);
  }

  delete (sheet: Sheet): void {
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

  updateSheet(sheet: Sheet): void {
    this.sheetService
      .update(sheet as Sheet)
      .subscribe(sheet => {
      });
  }
}
