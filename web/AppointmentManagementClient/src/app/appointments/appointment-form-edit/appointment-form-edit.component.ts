
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from 'src/services/appointment.service';

@Component({
  selector: 'app-appointment-form-edit',
  templateUrl: './appointment-form-edit.component.html',
  styleUrls: ['./appointment-form-edit.component.css']
})
export class AppointmentFormEditComponent implements OnInit {

  isEdit = false;

  form = this.fb.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    appointmentDate: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private service: AppointmentService,
    private dialogRef: MatDialogRef<AppointmentFormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id?: string }
  ) {}

  ngOnInit() {
    if (this.data?.id) {
      this.isEdit = true;
      this.service.getById(this.data.id).subscribe(x => {
        this.form.patchValue(x);
      });
    }
  }

  save() {    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    if (this.isEdit) {
      // Güncelleme
      this.service.update({
        id: formValue.id!,
        firstName: formValue.firstName!,
        lastName: formValue.lastName!,
        appointmentDate: formValue.appointmentDate!
      }).subscribe({
        next: () => {
          this.dialogRef.close(true); // true = başarılı
        },
        error: (err) => {
          console.error('Güncelleme hatası:', err);
          alert('Randevu güncellenirken bir hata oluştu.');
        }
      });
    } else {
      this.service.create({
        firstName: formValue.firstName!,
        lastName: formValue.lastName!,
        appointmentDate: formValue.appointmentDate!
      }).subscribe({
        next: () => {
          this.dialogRef.close(true); // true = başarılı
        },
        error: (err) => {
          console.error('Oluşturma hatası:', err);
          alert('Randevu oluşturulurken bir hata oluştu.');
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}

