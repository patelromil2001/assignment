import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class FormComponent {
  feedbackForm;
  submitting = false;
  serverMessage = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.feedbackForm.controls; }
  onSubmit() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.serverMessage = '';
    this.api.submitFeedback(this.feedbackForm.value).subscribe({
      next: res => {
        this.serverMessage = 'Thanks! Your feedback was submitted.';
        this.feedbackForm.reset();
        this.submitting = false;
      },
      error: err => {
        this.serverMessage = 'Submission failed — please try again later.';
        this.submitting = false;
      }
    });
  }
}
