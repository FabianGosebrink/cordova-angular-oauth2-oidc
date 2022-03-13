import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  modal: Window;

  constructor(public oidcSecurityService: OidcSecurityService) {}

  get isLoggedIn() {
    return this.oidcSecurityService.isAuthenticated$;
  }

  get token() {
    return this.oidcSecurityService.getAccessToken();
  }

  get userData$() {
    return this.oidcSecurityService.userData$;
  }

  checkAuth(url?: string) {
    if (this.modal) {
      this.modal.close();
    }

    return this.oidcSecurityService.checkAuth(url);
  }

  doLogin() {
    const urlHandler = (authUrl) => {
      console.log('opening', authUrl);
      this.modal = window.open(authUrl, '_blank');
    };

    this.oidcSecurityService.authorize(null, { urlHandler });
  }

  signOut() {
    return this.oidcSecurityService.logoffAndRevokeTokens();
  }
}
