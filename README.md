# Angular 12 OAuth 2.0 PKCE Code Flow Example including Retaining the URL

- using [angular-oauth2-oidc](https://www.npmjs.com/package/angular-oauth2-oidc)
- retaining the inital requested URL

## How it works

In `app.component.ts` the `tryToLogin()` method from the `AuthService` is called in the constructor.
In `tryToLogin()` the `OAuthService` is used to check if the login is possible.
If not, the code flow is initiated.
In addition, the currently requested page is saved to localStorage via the `AuthGuard`.
Also, the guard prevents the requested page from beeing loadet and redirects the user to the login page.

If, after the redirect or a reload, the login is possible, the localStorage is read for a previously stored URL.
If there is one stored, the user is forwarded to it and thus the initally requested URL is loaded.
