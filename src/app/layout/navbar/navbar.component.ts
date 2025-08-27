import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  isLoggedIn = signal<boolean>(false);

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    this.auth.userData.subscribe({
      next: (res) => {
        if (this.auth.userData.getValue() == null) {
          this.isLoggedIn.set(false);
        }
        else {
          this.isLoggedIn.set(true);
        }
      }
    })

  }



  logout() {
    // erase local storage
    localStorage.removeItem('userToken');

    // update userData
    this.auth.userData.next(null);

    // route to login
    this.router.navigate(['/login']);
  }
}
