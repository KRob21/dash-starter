import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import {
  collection,
  doc,
  getFirestore,
  increment,
  setDoc,
} from '@angular/fire/firestore';
import { Member } from '../../models/member.model';
import { SnackService } from '../../services/snack.service';
import { reauthenticateWithPhoneNumber } from '@firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  muid?: string;

  // * firebase variables
  auth = getAuth();
  db = getFirestore();
  colRef = collection(this.db, 'members');

  serverMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snack: SnackService
  ) {}

  ngOnInit(): void {
    const member = this.auth.currentUser;
    console.log(member);
    this.muid = localStorage.getItem('uid')!;
    if (!member) {
    }
    this.form = this.fb.group({
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      email: [member?.email, [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
    });
    console.log('muid ', this.muid);
  }

  get f_name() {
    return this.form.get('f_name');
  }
  get l_name() {
    return this.form.get('l_name');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get birthday() {
    return this.form.get('birthday');
  }

  validateAge() {
    const max_year = new Date().getFullYear() - 100;
    const min_year = new Date().getFullYear() - 21;
    const _month = new Date().getMonth() + 1;
    const _day = new Date().getDay();

    const dateofbirthDate = this.birthday?.value;
    const mindate = new Date(min_year + '-' + _month + '-' + _day);
    const maxdate = new Date(max_year + '-' + _month + '-' + _day);

    // console.log('validate age: ', dateofbirthDate);
    if (dateofbirthDate <= mindate && dateofbirthDate >= maxdate) {
      return true;
    } else return false;
  }

  async onSubmit() {
    this.loading = true;
    // Do nothing if the form is invalid
    if (this.form.invalid) {
      return;
    }
    // Disable the form
    this.form.disable();

    if (this.validateAge()) {
      console.log(this.form.value);

      const docRef = doc(this.db, 'members', this.muid!);
      setDoc(
        docRef,
        {
          f_name: this.form.value.f_name,
          l_name: this.form.value.l_name,
          birthday: this.form.value.birthday,
          phone: this.form.value.phone,
          email: this.form.value.email,
        },
        { merge: true }
      );
    } else {
      this.snack.ageError();
    }
  }
}
