import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
})
export class MemberProfileComponent {
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
