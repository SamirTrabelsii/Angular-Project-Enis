import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  //forçage du type : càd il apparit toujours en boite de dialog

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  public title = 'Are u sure ?';
  public content = 'Do you really want to remove this item ?';
  public confirmButton = 'Confirm';
  public cancelButton = 'Cancel';


}