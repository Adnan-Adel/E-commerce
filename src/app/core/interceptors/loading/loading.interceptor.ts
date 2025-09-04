import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { PlatformService } from '../../services/platform/platform.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let ngxSpinnerService: NgxSpinnerService = inject(NgxSpinnerService);
  let platformService: PlatformService = inject(PlatformService);

  if (platformService.checkPlatformBrowser()) {
    ngxSpinnerService.show();
  }

  return next(req).pipe(finalize(() => {
    ngxSpinnerService.hide()
  }));
};
