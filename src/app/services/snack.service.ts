import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError() {
    this.snackBar.open('your must be logged in!', 'OK', {
      duration: 5000,
    });

    return this.snackBar._openedSnackBarRef
      ?.onAction()
      .pipe(tap((_) => this.router.navigate(['/login'])))
      .subscribe();
  }

  ageError() {
    this.snackBar.open('you must be 21 to register', 'OK', {
      duration: 5000,
    });

    return this.snackBar._openedSnackBarRef
      ?.onAction()
      .pipe(tap((_) => this.router.navigate(['/login'])))
      .subscribe();
  }
  boardCreationSuccess() {
    this.snackBar.open('board and task created', 'OK', {
      duration: 5000,
    });
    return this.snackBar._openedSnackBarRef?.onAction().pipe(tap()).subscribe();
  }
}
