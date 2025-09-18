import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // inject auth service
  private auth : AuthService = inject(AuthService);

  // inject router service
  private router : Router = inject(Router);

  errorMessage = signal<string>('');

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{6}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{6}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  }, this.confirmPassword);

  confirmPassword(myForm: any) {
    if (myForm.get('password').value === myForm.get('rePassword').value) {
      return null;
    }
    else {
      return { notMatched: true };
    }
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.auth.registerAPI(this.registerForm.value).subscribe({
        next : (res)=> {
          if(res.message == "success") {
            // programming routing
            this.router.navigate(['/login']);
          }
        },
        error : (err)=> {
          this.errorMessage.set(err.error.message);
        }
      })
    }
  }
}
