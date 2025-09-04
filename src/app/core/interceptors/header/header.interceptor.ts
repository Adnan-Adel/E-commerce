import { inject } from '@angular/core';
import { PlatformService } from './../../services/platform/platform.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let platformService: PlatformService = inject(PlatformService);

  if (platformService.checkPlatformBrowser()) {
    if (localStorage.getItem('userToken')) {
      let userToken: any = { token: localStorage.getItem('userToken') };

      req = req.clone({
        setHeaders: userToken
      })
    }
  }

  return next(req);
};
