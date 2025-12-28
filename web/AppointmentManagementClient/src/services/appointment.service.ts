import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AppointmentCreate {
  firstName: string;
  lastName: string;
  appointmentDate: string;
}

export interface AppointmentList {
  id: string;
  firstName: string;
  lastName: string;
  appointmentDate: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {

  private apiUrl = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) {}

  create(data: AppointmentCreate): Observable<void> {
    return this.http.post<void>(this.apiUrl, data);
  }

  getAll(): Observable<AppointmentList[]> {
    return this.http.get<AppointmentList[]>(this.apiUrl);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
