import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // inject auth service
  private auth: AuthService = inject(AuthService);

  // inject router service
  private router: Router = inject(Router);

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{6}$/)]),
  });


  submitForm() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.auth.loginAPI(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == "success") {
            this.isLoading.set(false);
            
            // store token in local storage
            localStorage.setItem("userToken", res.token);

            // call service
            this.auth.setUserData();

            // route to home
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error.message);
        }
      })
    }
  }

  forgotPassword() {
    // route to forget password
    this.router.navigate(['/forget-password'])
  }
}
