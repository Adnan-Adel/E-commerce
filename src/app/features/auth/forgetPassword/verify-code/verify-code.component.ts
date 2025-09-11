import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  verifyForm = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  submitForm() {
    if (this.verifyForm.valid) {
      const code = this.verifyForm.get('resetCode')?.value;

      this.authService.verifyResetCode(code!).subscribe({
        next: (res) => {
          if (res.status === "Success") {
            this.toastr.success("Code verified successfully", "Success");
            this.router.navigate(['/reset-password']);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message || "Invalid code", "Error");
        }
      });
    }
  }
}
