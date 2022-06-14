import { Component, OnInit } from '@angular/core';
import { collection, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { addDoc, increment, serverTimestamp } from '@firebase/firestore';
import { Member } from '../../models/member.model';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

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
    // onAuthStateChanged(this.auth, (user) => {
    //   // console.log('auth Change', user);
    // });
  }

  // * toggle form typw
  changeType(val: any) {
    this.type = val;
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
        // * firebase 9 sign in with email code
        await signInWithEmailAndPassword(this.auth, email, password)
          .then((cred) => {
            const member = cred.user;
            const docRef = doc(this.db, 'members', member.uid);
            localStorage.setItem('uid', member.uid);
            setDoc(
              docRef,
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
            this.serverMessage = err.message;
            this.form.enable();
            return this.form.reset();
          });
      }
      if (this.isSignup) {
        // * firebase 9 create user code
        await createUserWithEmailAndPassword(this.auth, email, password)
          .then(async (cred) => {
            const member = {
              id: cred.user.uid,
              f_name: '',
              l_name: '',
              email: cred.user?.email || undefined,
              phone: '',
              birthday: '',
              profile_complete: false,
              profile_img: cred.user.photoURL || undefined,
              created: serverTimestamp(),
              last_login: serverTimestamp(),
              logins: 1,
              role: 'member',
            };
            const docRef = doc(this.colRef, member.id);
            setDoc(docRef, member, { merge: true });
            this.router.navigate(['dashboard']);
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
