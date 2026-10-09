import { Component, OnInit } from '@angular/core';
import { JobService, Job } from '../../services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit {

  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';

  // Form state
  isEditing: boolean = false;
  editingId: number | null = null;
  jobFormData: Job = this.emptyJob();

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  private emptyJob(): Job {
    return { title: '', company: '', location: '', qualification: '', salary: '' };
  }

  // GET /api/jobs
  loadJobs(): void {
    this.loading = true;
    this.errorMessage = '';
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load jobs. Please make sure the Express server is running on port 5000.';
        this.loading = false;
      }
    });
  }

  // Filter jobs by search term
  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredJobs = [...this.jobs];
    } else {
      this.filteredJobs = this.jobs.filter(j =>
        j.title.toLowerCase().includes(term) ||
        j.company.toLowerCase().includes(term) ||
        j.location.toLowerCase().includes(term)
      );
    }
  }

  // Submit form — POST or PUT
  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    const { title, company, location, qualification, salary } = this.jobFormData;

    if (!title || !company || !location || !qualification || !salary) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.isEditing && this.editingId !== null) {
      // PUT /api/jobs/:id
      this.jobService.updateJob(this.editingId, this.jobFormData).subscribe({
        next: () => { this.successMessage = 'Job updated successfully.'; this.resetForm(); this.loadJobs(); },
        error: () => { this.errorMessage = 'Failed to update job.'; }
      });
    } else {
      // POST /api/jobs
      this.jobService.addJob(this.jobFormData).subscribe({
        next: () => { this.successMessage = 'Job added successfully.'; this.resetForm(); this.loadJobs(); },
        error: () => { this.errorMessage = 'Failed to add job.'; }
      });
    }
  }

  // Populate form for editing
  editJob(job: Job): void {
    if (!job.id) return;
    this.isEditing = true;
    this.editingId = job.id;
    this.jobFormData = { title: job.title, company: job.company, location: job.location, qualification: job.qualification, salary: job.salary };
    this.successMessage = '';
    this.errorMessage = '';
  }

  // DELETE /api/jobs/:id
  deleteJob(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Delete this job listing?')) return;
    this.jobService.deleteJob(id).subscribe({
      next: () => { this.successMessage = 'Job deleted.'; this.loadJobs(); },
      error: () => { this.errorMessage = 'Failed to delete job.'; }
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingId = null;
    this.jobFormData = this.emptyJob();
  }
}
