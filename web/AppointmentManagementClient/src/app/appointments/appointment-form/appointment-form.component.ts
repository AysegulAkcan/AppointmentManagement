import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from 'src/services/appointment.service';
// import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  template: `
<mat-card>
<h2>Randevu Oluştur</h2>
<form [formGroup]="form" (ngSubmit)="submit()">
<mat-form-field appearance="outline" class="full">
<mat-label>Ad</mat-label>
<input matInput formControlName="firstName">
</mat-form-field>

<mat-form-field appearance="outline" class="full">
<mat-label>Soyad</mat-label>
<input matInput formControlName="lastName">
</mat-form-field>

<!-- <mat-form-field appearance="outline" class="full">
  <mat-label>Randevu Tarihi</mat-label>
  <input matInput [matDatepicker]="picker" formControlName="date">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field> -->

<mat-form-field appearance="outline" class="full">
  <mat-label>Randevu Tarihi ve Saati</mat-label>
  <input matInput 
         type="datetime-local" 
         formControlName="date"
         placeholder="Tarih ve saat seçin">
</mat-form-field>

<button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Kaydet</button>
</form>
</mat-card>
`,
  styles: [`.full { width: 100%; margin-bottom: 12px; }`]
})
export class AppointmentFormComponent {
  form = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  date: ['', Validators.required]
});


  constructor(private fb: FormBuilder, private service: AppointmentService) { }

  submit() {
    if (this.form.invalid) return;
    const value = this.form.value;

    this.service.create({
      firstName: value.firstName!,
      lastName: value.lastName!,
      appointmentDate: new Date(value.date!).toISOString()
    }).subscribe(() => {
      this.form.reset(); 
      window.location.reload();
    });
  }
//   submit() {
//   if (this.form.invalid) return;
//   this.service.create({
//     firstName: this.form.value.firstName!,
//     lastName: this.form.value.lastName!,
//     appointmentDate: new Date(this.form.value.appointmentDate!).toISOString()
//   }).subscribe(() => {
//     this.form.reset();
//   });
// }
}