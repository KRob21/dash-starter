import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  onSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { Member } from '../../models/member.model';
import { SnackService } from '../../services/snack.service';
@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  profileComplete = true;
  showForm = false;

  // * firebase variables
  auth = getAuth();
  db = getFirestore();
  colRef = collection(this.db, 'members');

  userData: any;
  muid = this.auth.currentUser?.uid;
  member: any;
  serverMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private cdref: ChangeDetectorRef,
    private router: Router,
    private snack: SnackService
  ) {}

  ngOnInit(): void {
    this.getUserData(this.muid);
  }

  getUserData(uid: any) {
    this.userData = onSnapshot(doc(this.colRef, uid), (doc) => {
      console.log(' current member data: ', doc.data());
      this.member = doc.data();
      this.profileComplete = this.member.profile_complete;
    });
  }

  editProfile() {
    console.log('editting profile...');
    this.buildForm();
    this.showForm = true;
    this.cdref.detectChanges();
  }

  buildForm() {
    console.log('building the form...');
    this.form = new FormGroup({
      f_name: new FormControl(this.member?.f_name || '', [Validators.required]),
      l_name: new FormControl(this.member?.l_name || '', [Validators.required]),
      phone: new FormControl(this.member?.phone || '', [
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
      ]),
      email: new FormControl(this.member?.email || null),
      birthday: new FormControl(this.member?.birthday || null),
    });
  }

  onSubmit() {
    console.log('submitting form...', this.form.value);
    this.showForm = false;
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
          email: this.form.value.email,
          birthday: this.form.value.birthday,
          phone: this.form.value.phone,
          profile_complete: true,
        },
        { merge: true }
      );
      this.profileComplete = true;
    } else {
      this.snack.ageError();
    }
  }

  // * validate a users age if needed
  validateAge() {
    const max_year = new Date().getFullYear() - 100;
    const min_year = new Date().getFullYear() - 18; // set the number of years to the age requirement
    // console.log('min_year ', min_year);
    // console.log('max_year ', max_year);
    const _month = new Date().getMonth() + 1;
    const _day = new Date().getDay();
    //console.log('_month ', _month);
    //console.log('_day ', _day);
    const dateofbirthDate = this.form.value.birthday;
    // console.log('dateofbirthDate ', dateofbirthDate);
    const mindate = new Date('June 19, 2001 03:24:00');
    const maxdate = new Date('June 19, 1922 03:24:00');
    // console.log('mindate ', mindate);
    // console.log('maxdate ', maxdate);
    if (dateofbirthDate <= mindate && dateofbirthDate >= maxdate) {
      return true;
    } else return false;
  }
}

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
