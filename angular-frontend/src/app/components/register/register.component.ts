import { Component } from '@angular/core';
import { ApiService, RegisterData } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  formData: RegisterData = {
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    jobRole: ''
  };

  submitted: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService) {}

  onSubmit(form: any): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Please complete all required fields correctly before submitting.';
      return;
    }

    this.loading = true;
    this.apiService.register(this.formData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.successMessage = response.message || 'Registration completed successfully!';
          // Reset form data after successful submission
          form.resetForm();
          this.submitted = false;
        } else {
          this.errorMessage = response.message || 'Registration failed.';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Registration error:', err);
        this.errorMessage = 'Failed to submit registration. Please ensure Express API is running.';
      }
    });
  }
}
