import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://offeringsolutions-sts.azurewebsites.net',
        redirectUrl: 'gatherrapp://localhost',
        postLogoutRedirectUri: 'gatherrapp://callback',
        clientId: 'gatherrapp',
        scope: 'openid profile email offline_access gatherr_api',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
