import { Injectable } from '@angular/core';
import { authCodeFlowConfig } from './auth.config';
import { LAST_ROUTE } from './auth.guard';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _hasValidToken = new ReplaySubject<boolean>(1);
  hasValidToken = this._hasValidToken.asObservable();

  constructor(private oauthService: OAuthService, private router: Router) {}

  async tryToLogin() {
    this.oauthService.configure(authCodeFlowConfig);
    console.log(await this.oauthService.loadDiscoveryDocumentAndTryLogin());

    if (!this.oauthService.hasValidAccessToken()) {
      this._hasValidToken.next(false);
      this.oauthService.initCodeFlow();
      return;
    }

    this.oauthService.setupAutomaticSilentRefresh();
    this._hasValidToken.next(true);

    const url = localStorage.getItem(LAST_ROUTE) as string;
    localStorage.removeItem(LAST_ROUTE);

    if (!url || url == '/') {
      this.router.navigate(['after-login']);
      return;
    }

    this.router.navigateByUrl(url);
  }
}
