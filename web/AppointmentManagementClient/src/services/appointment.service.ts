import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';


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
private apiUrl = 'https://localhost:7180/api/appointments';

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
// @Injectable({ providedIn: 'root' })

//   private refreshSubject = new Subject<void>();
//   refresh$ = this.refreshSubject.asObservable();

//   private apiUrl = 'https://localhost:7065/api/appointments';

//   constructor(private http: HttpClient) {}

//   create(data: AppointmentCreate) {
//     return this.http.post<void>(this.apiUrl, data).pipe(
//       tap(() => this.refreshSubject.next())
//     );
//   }

//   getAll() {
//     return this.http.get<AppointmentList[]>(this.apiUrl);
//   }


}

// private refreshSubject = new Subject<void>();
//   refresh$ = this.refreshSubject.asObservable();

//   private apiUrl = 'https://localhost:7065/api/appointments';

//   constructor(private http: HttpClient) {}

//   create(data: AppointmentCreate) {
//     return this.http.post<void>(this.apiUrl, data).pipe(
//       tap(() => this.refreshSubject.next())
//     );
//   }

//   getAll() {
//     return this.http.get<AppointmentList[]>(this.apiUrl);
//   }