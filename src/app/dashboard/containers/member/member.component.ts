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
  profileComplete: boolean = false;

  // * firebase variables
  auth = getAuth();
  db = getFirestore();
  colRef = collection(this.db, 'members');

  member = this.auth.currentUser;

  // * profile form
  form = new FormGroup({
    phone: new FormControl(''),
    email: new FormControl(this.member?.email || null),
    birthday: new FormControl(''),
    // platforms: new FormGroup({
    //   netflix: new FormControl(false),
    //   hulu: new FormControl(false),
    //   disney: new FormControl(false),
    //   prime: new FormControl(false),
    //   hbo: new FormControl(false),
    //   peacock: new FormControl(false),
    //   paramount: new FormControl(false),
    //   showtime: new FormControl(false),
    //   apple: new FormControl(false),
    //   discovery: new FormControl(false),
    //   britbox: new FormControl(false),
    //   acorn: new FormControl(false),
    //   pluto: new FormControl(false),
    //   amc: new FormControl(false),
    //   epix: new FormControl(false),
    //   hallmark: new FormControl(false),
    //   starz: new FormControl(false),
    // }),
  });
  serverMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snack: SnackService
  ) {}

  ngOnInit(): void {
    console.log(this.member);
    this.muid = localStorage.getItem('uid')!;
    if (!this.member) {
    }
    console.log('muid ', this.muid);
  }

  // * form getters
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get birthday() {
    return this.form.get('birthday');
  }

  // * validate a users age if needed
  validateAge() {
    const max_year = new Date().getFullYear() - 100;
    const min_year = new Date().getFullYear() - 18; // set the number of years to the age requirement
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
      const docRef = doc(this.db, 'members', this.member!.uid);
      setDoc(
        docRef,
        {
          birthday: this.form.value.birthday,
          phone: this.form.value.phone,
        },
        { merge: true }
      );
      // set localstorage for better user experience in testing
      localStorage.setItem('profileCompleted', 'true');
      this.profileComplete = true;
    } else {
      this.snack.ageError();
    }
  }
}
