import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const LAST_ROUTE = 'LAST_ROUTE';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.hasValidToken.pipe(
      tap((isValid) => {
        if (!isValid) {
          localStorage.setItem(LAST_ROUTE, state.url);
          this.router.navigate(['']);
        }
      })
    );
  }
}
