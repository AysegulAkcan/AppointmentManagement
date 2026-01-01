
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
    // if (this.data?.id) {
    //   this.isEdit = true;
    //   this.service.getById(this.data.id).subscribe(x => {
    //     this.form.patchValue(x);
    //   });
    // }
  }

  save() {
    if (this.form.invalid) return;

    // const request =  this.service.create(this.form.value);

    // request.subscribe(() => {
    //   this.dialogRef.close(true); // listeye "yenile" sinyali
    // });
  }

  close() {
    this.dialogRef.close();
  }
}

