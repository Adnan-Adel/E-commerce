import { ToastrService } from 'ngx-toastr';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toastrService: ToastrService = inject(ToastrService);
  return next(req).pipe(catchError((err) => {
    toastrService.error(err.error.message)

    return throwError(() => err)
  }));
};
