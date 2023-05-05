import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Firebase } from '@awesome-cordova-plugins/firebase/ngx';
import { FcmService } from './shared/service/fcm.service';
import { ToastService } from './shared/service/toast.service';
const firebaseConfig = {
  apiKey: "AIzaSyACq2f-jJ8GQvFL21lv8Z8OIEwpUetnmBU",
  authDomain: "heartstonelib-53012.firebaseapp.com",
  projectId: "heartstonelib-53012",
  storageBucket: "heartstonelib-53012.appspot.com",
  messagingSenderId: "602261288799",
  appId: "1:602261288799:web:542a3d52ec480d3d0b68ea",
  measurementId: "G-YY6ZPWSXWW"
};
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule, 
     IonicStorageModule.forRoot(),
     provideFirebaseApp(() => initializeApp(firebaseConfig)),
     provideFirestore(() => getFirestore())
     
    ],
  providers: [
    Firebase,
    FcmService,
    ToastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
