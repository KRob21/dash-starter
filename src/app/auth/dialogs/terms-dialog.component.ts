import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-dialog',
  template: `
    <h1 mat-dialog-title>Terms and Conditions</h1>
    <div mat-dialog-content>
      <p>'Do you agrees to the terms and conditions?'</p>
      <p>{{ data.terms }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button (click)="agreeToTerms()">Agree to terms</button>
    </div>
  `,
  styles: [],
})
export class TermsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TermsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  agreeToTerms() {
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
