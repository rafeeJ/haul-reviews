import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ProfilePageComponent } from './features/profile-page/profile-page.component';
import { HaulCreatorComponent } from './features/haul-creator/haul-creator.component';

const firebaseConfig = {
  apiKey: "AIzaSyBuhaMWFpZhM55INDUD_rDRJ0TLNcIfg98",
  authDomain: "haul-reviewer.firebaseapp.com",
  databaseURL: "https://haul-reviewer.firebaseio.com",
  projectId: "haul-reviewer",
  storageBucket: "haul-reviewer.appspot.com",
  messagingSenderId: "653511945658",
  appId: "1:653511945658:web:8b21afcaf6fc914ff0c183",
  measurementId: "G-3BM7GPLHMV"
};


@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    BottomBarComponent,
    HomePageComponent,
    ProfilePageComponent,
    HaulCreatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule // auth
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
