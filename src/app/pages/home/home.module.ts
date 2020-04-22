import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SheetsComponent } from '../sheets/sheets.component';
import { HomePage } from './home.page';
import { TimerComponent } from '../timer/timer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    SheetsComponent,
    TimerComponent
  ]
})
export class HomePageModule {}
