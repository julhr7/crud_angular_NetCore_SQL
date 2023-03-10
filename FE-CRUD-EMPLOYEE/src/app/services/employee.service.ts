import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Employee/';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteEmployee (id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.myAppUrl}${this.myApiUrl}`, employee);
  }

  updateEmployee (id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, employee);
  }
}
