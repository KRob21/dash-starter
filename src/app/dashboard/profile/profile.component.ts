import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { collection, getFirestore } from '@angular/fire/firestore';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  auth = getAuth();
  db = getFirestore();
  colRef = collection(this.db, 'members');

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const member = this.auth.currentUser;
    console.log('auth', member);
    if (!member) {
    }
    this.form = this.fb.group({
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      email: [member?.email, [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
    });
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
  async onSubmit() {
    console.log(this.form.value);
  }
}
