import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule } from "@angular/forms";
import { NgMaterialModule } from "./ng-material.module";
import { HttpClientModule } from "@angular/common/http";

import { DragDropModule } from "@angular/cdk/drag-drop";

//Firestore
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
//import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
//remove firestore warning
import { FirestoreSettingsToken } from "@angular/fire/firestore";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgMaterialModule,
    HttpClientModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }, AngularFirestore], //remove firestore warning
  bootstrap: [AppComponent]
})
export class AppModule {}
