import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  id?: number;
  title: string;
  company: string;
  location: string;
  qualification: string;
  salary: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  // Base URL of the existing Express backend
  private apiUrl = 'http://localhost:5000/api/jobs';

  constructor(private http: HttpClient) {}

  // GET /api/jobs — fetch all jobs
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  // GET /api/jobs/:id — fetch one job
  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  // POST /api/jobs — add new job
  addJob(job: Job): Observable<any> {
    return this.http.post(this.apiUrl, job);
  }

  // PUT /api/jobs/:id — update existing job
  updateJob(id: number, job: Job): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, job);
  }

  // DELETE /api/jobs/:id — delete job
  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
