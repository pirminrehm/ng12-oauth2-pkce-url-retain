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
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();

    if (!this.oauthService.hasValidAccessToken()) {
      this._hasValidToken.next(false);
      this.oauthService.initCodeFlow();
      return;
    }

    this._hasValidToken.next(true);

    const url = localStorage.getItem(LAST_ROUTE) as string;
    localStorage.removeItem(LAST_ROUTE);

    if (!url || url == '/') {
      this.router.navigate(['after-login']);
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
