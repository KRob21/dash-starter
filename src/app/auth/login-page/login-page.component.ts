import { Component, OnInit } from '@angular/core';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  auth = getAuth();

  constructor() {}

  ngOnInit(): void {}

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('the user signed out');
        localStorage.clear();
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }
}
