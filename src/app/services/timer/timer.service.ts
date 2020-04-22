import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  subscription: Subscription;
  onComplete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  startTimer(running: boolean, value: number[], subscription: Subscription): { boolean, Subscription } {
    if (!running) {
      // Set running to true.
      running = true;
      // Check if the timer is comeplete and if so reset it before starting.
      if (value[0] === 0 && value[1] === 0) {
        this.resetTimer(value[0], value[1], running, subscription);
      }
      // Create Rxjs interval to call a update method every second.
      subscription = interval(1000).subscribe(x => this.updateTimer(running, value, subscription));
    }
    return { boolean: running, Subscription: subscription };
  }

  stopTimer(running: boolean, subscription: Subscription): { boolean, Subscription} {
    if (running) {
      // Set running to false.
      running = false;
      // If we want to stop the timer then unsubscribe from the interval.
      if (subscription) {
        subscription.unsubscribe();
      }
    }
    return { boolean: running, Subscription: subscription};
  }

  resetTimer(m: number, s: number, running: boolean, subscription: Subscription): number[] {
    // Set the minutes and seconds back to their original values.
    this.stopTimer(running, subscription);
    return [m, s];
  }

  updateTimer(running: boolean, value: number[], subscription: Subscription): number[] {
    if (running) {
      // Check if the timer is comeplete and if so stop the timer and run onComplete().
      if (value[0] === 0 && value[1] === 0) {
        this.stopTimer(running, subscription);
        // Make a sound/send an alert.
        this.onComplete.emit();
      } else if (value[0] !== 0 && value[1] === 0) {
        value = [value[0] - 1, 59];
      } else if (value[1] !== 0) {
        return [value[0], value[1] - 1];
      }
    }
  }
}
