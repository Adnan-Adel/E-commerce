import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private authService: AuthService = inject(AuthService);
  private toastrService: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  submitForm() {
    if (this.forgetPasswordForm.valid) {
      const email = this.forgetPasswordForm.get('email')?.value;

      this.authService.forgotPassword(email).subscribe({
        next: (res) => {
          if (res.statusMsg === "success") {
            this.toastrService.success("Verification code sent to your email", "Success");
            localStorage.setItem("resetEmail", email);

            this.router.navigate(['/verify-code']);
          }
        },
        error: (err) => {
          this.toastrService.error(err.error.message || "Something went wrong", "Error");
        }
      });
    }
  }

}
