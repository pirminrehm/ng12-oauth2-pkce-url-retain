import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss'],
})
export class AfterLoginComponent implements OnInit {
  token = '';
  tokenObject = {};

  constructor(private oauthService: OAuthService) {}

  ngOnInit(): void {
    this.token = this.oauthService.getAccessToken();
    this.tokenObject = JSON.parse(atob(this.token.split('.')[1]));
  }
}
