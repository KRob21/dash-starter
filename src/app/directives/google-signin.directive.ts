import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor() {}

  @HostListener('click')
  onclick() {
    console.log('login with google auth');
  }
}
