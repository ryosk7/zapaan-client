import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { FormsModule } from '@angular/forms';
import { SheetCreateComponent } from '../app/pages/sheet-create/sheet-create.component';
import { SheetUpdateComponent } from '../app/pages/sheet-update/sheet-update.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SheetCreateComponent,
    SheetUpdateComponent
  ],
  entryComponents: [SheetCreateComponent, SheetUpdateComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    StatusBar,
    ApiService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
