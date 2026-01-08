import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentList, AppointmentService } from 'src/services/appointment.service';
import { AppointmentFormEditComponent } from '../appointment-form-edit/appointment-form-edit.component';

@Component({
  selector: 'app-appointment-list',
  template: `
    <h2>Randevu Listesi</h2>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="appointmentHour">
        <th mat-header-cell *matHeaderCellDef>Saat</th>
        <td mat-cell *matCellDef="let x">
          {{ x.appointmentDate | date:'HH:mm' }}
        </td>
      </ng-container>

      <ng-container matColumnDef="appointmentDate">
        <th mat-header-cell *matHeaderCellDef>Tarih</th>
        <td mat-cell *matCellDef="let x">
          {{ x.appointmentDate | date:'dd MMMM yyyy' }}
        </td>
      </ng-container>

      <ng-container matColumnDef="firstName">
        <th mat-header-cell *matHeaderCellDef>Ad</th>
        <td mat-cell *matCellDef="let x">{{ x.firstName }}</td>
      </ng-container>

      <ng-container matColumnDef="lastName">
        <th mat-header-cell *matHeaderCellDef>Soyad</th>
        <td mat-cell *matCellDef="let x">{{ x.lastName }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>İşlemler</th>
        <td mat-cell *matCellDef="let x">
          <button mat-icon-button color="warn" (click)="delete(x.id)">
            <mat-icon>delete</mat-icon>
          </button>
          <button mat-icon-button color="primary" (click)="update(x.id)">
            <mat-icon>edit</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns;"></tr>
    </table>
    
    <mat-paginator 
      [pageSizeOptions]="[5, 10, 25, 50]"
      [pageSize]="10"
      showFirstLastButtons>
    </mat-paginator>
  `
})
export class AppointmentListComponent implements OnInit {
  dataSource = new MatTableDataSource<AppointmentList>([]);
  columns = ['appointmentHour', 'appointmentDate', 'firstName', 'lastName', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: AppointmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.service.getAll().subscribe(x => {
      this.dataSource.data = x;
    });
  }

  update(id: string) {
    const dialogRef = this.dialog.open(AppointmentFormEditComponent, {
      width: '500px',
      disableClose: true,
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadData();
      }
    });
  }

  delete(id: string) {
    if (!confirm('Bu randevuyu silmek istiyor musunuz?')) return;

    this.service.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(x => x.id !== id);
    });
  }
}