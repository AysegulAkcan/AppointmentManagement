import { Component, OnInit } from '@angular/core';
import { AppointmentList, AppointmentService } from 'src/services/appointment.service';
// import { AppointmentService, AppointmentList } from '../services/appointment.service';

@Component({
selector: 'app-appointment-list',
template: `
<mat-card>
<h2>Randevu Listesi</h2>
<table mat-table [dataSource]="data">

<ng-container matColumnDef="appointmentHour">
<th mat-header-cell *matHeaderCellDef>Saat</th>
 <td mat-cell *matCellDef="let x">
    {{ x.appointmentDate | date:'HH:mm' }}
  </td></ng-container>
  
<ng-container matColumnDef="appointmentDate">
<th mat-header-cell *matHeaderCellDef>Tarih</th>
 <td mat-cell *matCellDef="let x">
    {{ x.appointmentDate | date:'dd MMMM yyyy' }}
  </td></ng-container>

<ng-container matColumnDef="firstName">
<th mat-header-cell *matHeaderCellDef>Ad</th>
<td mat-cell *matCellDef="let x">{{x.firstName}}</td>
</ng-container>

<ng-container matColumnDef="lastName">
<th mat-header-cell *matHeaderCellDef>Soyad</th>
<td mat-cell *matCellDef="let x">{{x.lastName}}</td>
</ng-container>

<ng-container matColumnDef="actions">
  <th mat-header-cell *matHeaderCellDef>İşlemler</th>
  <td mat-cell *matCellDef="let x">
    <button mat-icon-button color="warn" (click)="delete(x.id)">
     <mat-icon>delete</mat-icon>
    </button>
  </td>
</ng-container>

<tr mat-header-row *matHeaderRowDef="columns"></tr>
<tr mat-row *matRowDef="let row; columns: columns;"></tr>
</table>
</mat-card>
`
})
export class AppointmentListComponent implements OnInit {
data: AppointmentList[] = [];

columns = ['appointmentHour' ,'appointmentDate', 'firstName', 'lastName','actions'];

constructor(private service: AppointmentService) {}

delete(id: string) {
  if (!confirm('Bu randevuyu silmek istiyor musunuz?')) return;

  this.service.delete(id).subscribe(() => {
    this.data = this.data.filter(x => x.id !== id); // UI anında güncellenir
  });
}

ngOnInit() {
this.service.getAll().subscribe(x => this.data = x);
}
// ngOnInit() {
//   this.load();

//   this.service.refresh$.subscribe(() => {
//     this.load();
//   });
// }

// load() {
//   this.service.getAll().subscribe(x => this.data = x);
// }
}