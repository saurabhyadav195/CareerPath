import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Resource {
  id: number;
  title: string;
  type: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  jobRole: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // GET /api/resources
  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/resources`);
  }

  // POST /api/register
  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
