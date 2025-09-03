import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../services/platform/platform.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router: Router = inject(Router);
  let platform: PlatformService = inject(PlatformService);

  if (platform.checkPlatformBrowser()) {
    if (localStorage.getItem('userToken')) {
      return true;
    }
    return router.createUrlTree(['/login']);
  }
  return router.createUrlTree(['/login']);
};
