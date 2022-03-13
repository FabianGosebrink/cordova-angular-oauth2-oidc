import { Component, NgZone, OnInit } from '@angular/core';
import { LoginResponse } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cordova-oauth2-oidc';

  authInfo$: Observable<LoginResponse>;

  constructor(private authService: AuthService, private zone: NgZone) {}

  ngOnInit() {
    this.checkAuth();
  }

  login() {
    this.authService.doLogin();
  }

  checkAuth() {
    (window as any).handleOpenURL = (url: string) => {
      this.zone.run(() => {
        this.authInfo$ = this.authService.checkAuth(url);
      });
    };
  }
}
