import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-director',
  templateUrl: './add-director.component.html',
  styleUrls: ['./add-director.component.css']
})
export class AddDirectorComponent implements OnInit {

  newDirectorForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddDirectorComponent>) { }

  ngOnInit() {
    this.newDirectorForm = new FormGroup({
      directorName: new FormControl('', Validators.required),
    });
  }

  closeDialog() {
    if (this.newDirectorForm.valid) {
      this.dialogRef.close({
        director_name: this.newDirectorForm.value.directorName,
      });
    }
  }

}
