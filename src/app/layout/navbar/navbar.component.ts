import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateDirective, TranslateService } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CartService } from '../../core/services/cart/cart.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private translate = inject(TranslateService);
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

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

  useLanguage(language: string): void {
    this.translate.use(language);

    localStorage.setItem('lang', language);

    if(language == "en") {
      document.body.dir = "ltr";
    }
    else if(language == "ar") {
      document.body.dir = "rtl";
    }
  }
}
