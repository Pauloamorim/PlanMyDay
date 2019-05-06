import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatGridListModule, MatNativeDateModule, MatDatepickerModule, 
         MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, 
		 MatTableModule, MatCheckboxModule, MatTooltipModule, MatSidenavModule, 
		 MatToolbarModule, MatListModule } from '@angular/material'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

import { TaskService } from '../app/service/task.service';
import { MenuComponent } from './components/menu/menu.component';
import { TaskComponent } from './components/task/task.component'

import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
	  path: '',
	  component: TaskComponent
	}
  ];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TaskComponent
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
	MatSidenavModule,
	MatToolbarModule,
	MatListModule,
	FlexLayoutModule,
    SweetAlert2Module.forRoot(),
	AngularFireModule.initializeApp(environment.config),
	RouterModule.forRoot(routes),
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
