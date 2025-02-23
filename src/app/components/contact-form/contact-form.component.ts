import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  standalone: true,
})
export class ContactFormComponent {
  contactForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = this.contactForm.value;

    this.http
      .post('https://formspree.io/f/xqaejwez', body, { headers })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Form submitted successfully', response);
          this.contactForm.reset();
          this.router.navigate(['/thank-you']);
        },
        error: (error: any) => {
          console.error('Form submission error', error);
        },
      });
  }
}
