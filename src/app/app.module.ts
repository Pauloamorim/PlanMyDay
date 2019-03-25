import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatGridListModule, MatNativeDateModule, MatDatepickerModule, 
         MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, 
         MatTableModule, MatCheckboxModule, MatTooltipModule } from '@angular/material'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

import { TaskService } from '../app/service/task.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaterialTimepickerModule.forRoot(),
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatGridListModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule
  ],
  providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
      TaskService,
      AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
