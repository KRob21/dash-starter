import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { getAuth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  auth = getAuth();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  logout() {
    console.log('logging out...');

    signOut(this.auth)
      .then(() => {
        console.log('the user signed out');
        this.router.navigate(['login']);
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }
}
