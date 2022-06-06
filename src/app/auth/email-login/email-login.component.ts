import { Component, OnInit } from '@angular/core';
import { collection, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addDoc, increment, serverTimestamp } from '@firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { merge } from 'rxjs';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  form!: FormGroup;
  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;
  auth = getAuth();
  db = getFirestore();
  colRef = collection(this.db, 'members');

  serverMessage: string | undefined;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });
    onAuthStateChanged(this.auth, (user) => {
      // console.log('auth Change', user);
    });
  }

  changeType(val: any) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password!.value === this.passwordConfirm!.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    // Do nothing if the form is invalid
    if (this.form.invalid) {
      return;
    }
    // Disable the form
    this.form.disable();

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        // ? firebase 9 sign in with email code
        await signInWithEmailAndPassword(this.auth, email, password)
          .then((cred) => {
            console.log('user logged In: ', cred.user);
            const member = doc(this.db, 'members', cred.user.uid);

            setDoc(
              member,
              {
                logins: increment(1),
                last_login: serverTimestamp(),
              },
              { merge: true }
            );
            this.router.navigate(['dashboard']);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
      if (this.isSignup) {
        // ? firebase 9 create user code
        await createUserWithEmailAndPassword(this.auth, email, password)
          .then(async (cred) => {
            // console.log('user created: ', cred.user);
            const member = cred.user;
            // console.log('user logged In: ', member.uid);
            const docRef = doc(this.colRef, member.uid);
            setDoc(
              docRef,
              {
                email: email,
                uid: member.uid,
                created: serverTimestamp(),
                last_login: serverTimestamp(),
                logins: 1,
                ProfileComplete: false,
              },
              { merge: true }
            );
            console.log('docRef: ');
            this.router.navigate(['dashboard']);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
      if (this.isPasswordReset) {
        await sendPasswordResetEmail(this.auth, email);
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      console.log('err... ', err);
      this.serverMessage = 'err...';
    }

    this.loading = false;
  }
}
