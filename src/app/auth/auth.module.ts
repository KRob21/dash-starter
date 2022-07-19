import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from '../directives/google-signin.directive';
import { EmailLoginComponent } from './email-login/email-login.component';
import { TermsDialogComponent } from '../dialogs/terms-dialog/terms-dialog.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    GoogleSigninDirective,
    EmailLoginComponent,
    TermsDialogComponent,
  ],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, SharedModule],
  entryComponents: [TermsDialogComponent],
})
export class UserModule {}
