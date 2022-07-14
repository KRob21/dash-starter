import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';

import { collection, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { increment, serverTimestamp } from '@firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

// dialogs
import { MatDialog } from '@angular/material/dialog';
import { TermsDialogComponent } from '../dialogs/terms-dialog.component';

import { Member } from '../../models/member.model';
import { AuthService } from '../services/auth.service';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
      agree_to_terms: [false, [Validators.requiredTrue]],
    });
  }

  // * toggle form type
  changeType(val: any) {
    this.type = val;
    //  TODO build the form based on the type of form.
  }

  // * getters
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
  openTermsDialog(): void {
    const dialogRef = this.dialog.open(TermsDialogComponent, {
      width: '400px',
      data: { terms: 'this is some board data' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.form.get('agree_to_terms')?.setValue(true);
      } else {
        this.form.get('agree_to_terms')?.setValue(false);
      }
    });
  }

  async onSubmit() {
    this.loading = true;
    // Do nothing if the form is invalid
    if (this.form.invalid) {
      return;
    }
    // Disable the form
    this.form.disable();
    // Get the email and password
    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        // * firebase 9 sign in with email code
        // TODO move into AUTH service
        await signInWithEmailAndPassword(this.auth, email, password)
          .then((cred) => {
            const member = cred.user;
            const docRef = doc(this.db, 'members', member.uid);
            localStorage.setItem('uid', member.uid);
            setDoc(
              docRef,
              {
                total_logins: increment(1),
                last_login: serverTimestamp(),
              },
              { merge: true }
            );
            this.router.navigate(['dashboard']);
          })
          .catch((err) => {
            console.log(err.message);
            this.serverMessage = err.message;
            this.form.enable();
            return this.form.reset();
          });
      }
      if (this.isSignup) {
        // * firebase 9 create user code
        // TODO move into AUTH service
        await createUserWithEmailAndPassword(this.auth, email, password)
          .then(async (cred) => {
            const member = {
              id: cred.user.uid,
              email: email,
              profile_complete: false,
              created: serverTimestamp(),
              last_login: serverTimestamp(),
              total_logins: 1,
              role: 'member',
              agreed_to_terms: this.form.get('agree_to_terms')?.value,
            };
            const docRef = doc(this.colRef, member.id);
            setDoc(docRef, member, { merge: true });
            this.router.navigate(['dashboard/profile']);
          })
          .catch((err) => {
            console.log(err.message);
            this.serverMessage = err.message;
            this.form.enable();
            return this.form.reset();
          });
      }
      if (this.isPasswordReset) {
        await sendPasswordResetEmail(this.auth, email);
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      console.log('err... ', err);
      this.serverMessage = 'err...';
      this.form.enable();
      return this.form.reset();
    }

    this.loading = false;
  }
}
