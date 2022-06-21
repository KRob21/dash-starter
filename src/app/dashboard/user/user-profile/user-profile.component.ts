import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @Input()
  parent!: FormGroup;

  ngOnInit(): void {}

  get f_name() {
    return this.parent.get('f_name');
  }
  get l_name() {
    return this.parent.get('l_name');
  }
  get email() {
    return this.parent.get('email');
  }
  get phone() {
    return this.parent.get('phone');
  }
  get birthday() {
    return this.parent.get('birthday');
  }
}
