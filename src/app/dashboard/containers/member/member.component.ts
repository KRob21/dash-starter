import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import {
  collection,
  doc,
  getFirestore,
  increment,
  setDoc,
} from '@angular/fire/firestore';
import { Member } from '../../../models/member.model';
import { SnackService } from '../../../services/snack.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  loading = false;
  muid?: string;

  // * firebase variables
  auth = getAuth();
  db = getFirestore();
  colRef = collection(this.db, 'members');

  member = this.auth.currentUser;
  form = new FormGroup({
    f_name: new FormControl(''),
    l_name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(this.member?.email || null),
    birthday: new FormControl(''),
    platforms: new FormGroup({
      netflix: new FormControl(false),
      hulu: new FormControl(false),
      disney: new FormControl(false),
      prime: new FormControl(false),
      hbo: new FormControl(false),
      peacock: new FormControl(false),
      paramount: new FormControl(false),
      showtime: new FormControl(false),
      appleTv: new FormControl(false),
      discovery: new FormControl(false),
      britbox: new FormControl(false),
      acorn: new FormControl(false),
      pluto: new FormControl(false),
      amc: new FormControl(false),
      epix: new FormControl(false),
      hallmark: new FormControl(false),
      starz: new FormControl(false),
    }),
  });
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
