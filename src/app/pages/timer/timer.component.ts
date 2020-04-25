import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { TimerService } from '../../services/timer/timer.service'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {

  m: number = 25;
  s: number = 0;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onComplete: EventEmitter<any> = new EventEmitter();

  running = false;
  value = [25, 0];
  subscription: Subscription;

  constructor(private timerService: TimerService) { }

  ngOnInit(): void {}

  // delete(sheet: Sheet): void {
  //   this.sheets = this.sheets.filter(s => s !== sheet);
  //   this.sheetService.delete(sheet).subscribe(sheet => {
  //     this.getSheets();
  //   });
  // }

  startTimer(): void {
    this.timerService.start().subscribe(timer => {
      
    });
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

  resetTimer(): void {
    // Set the minutes and seconds back to their original values.
    this.stopTimer();
    this.value = [this.m, this.s];
  }

  updateTimer(): void {
    if (this.running) {
      // Check if the timer is comeplete and if so stop the timer and run onComplete().
      if (this.value[0] === 0 && this.value[1] === 0) {
        this.stopTimer();
        // Make a sound/send an alert.
        this.onComplete.emit();
      } else if (this.value[0] !== 0 && this.value[1] === 0) {
        this.value = [this.value[0] - 1, 59];
      } else if (this.value[1] !== 0) {
        this.value = [this.value[0], this.value[1] - 1];
      }
    }
  }
}
