

// -----------------------------
// app.module.ts
// -----------------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppointmentFormComponent } from './appointments/appointment-form/appointment-form.component';
import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { MatDialogModule } from '@angular/material/dialog';
import { AppointmentFormEditComponent } from './appointments/appointment-form-edit/appointment-form-edit.component';
registerLocaleData(localeTr);

@NgModule({
  declarations: [
    AppComponent,
    AppointmentFormComponent,
    AppointmentListComponent,
    AppointmentFormEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule
  ],
 providers: [{ provide: LOCALE_ID, useValue: 'tr-TR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
