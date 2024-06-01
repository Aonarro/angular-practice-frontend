import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers`);
  }

  getTasks(customerId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks/${customerId}`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks/new`, task);
  }

  deleteTask(taskId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tasks/${taskId}`);
  }

  doneTask(task: any): Observable<any> {
    const taskId = task._id;
    return this.http.put<any>(`${this.apiUrl}/tasks/${taskId}`, {
      done: !task.done,
    });
  }
}
