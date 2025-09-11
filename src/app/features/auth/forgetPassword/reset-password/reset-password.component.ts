import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  resetForm = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  submitForm() {
    if (this.resetForm.valid) {
      const email = localStorage.getItem("resetEmail");
      const newPassword = this.resetForm.get('newPassword')?.value;
      const confirmPassword = this.resetForm.get('confirmPassword')?.value;

      if (newPassword !== confirmPassword) {
        this.toastr.error("Passwords do not match", "Error");
        return;
      }

      this.authService.resetPassword(email!, newPassword!).subscribe({
        next: (res) => {
          if (res.token) {
            this.toastr.success("Password reset successful", "Success");
            // auto login after reset
            localStorage.setItem("userToken", res.token);
            this.authService.setUserData();
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message || "Something went wrong", "Error");
        }
      });
    }
  }
}
