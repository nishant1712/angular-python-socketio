import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  newMovieForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddMovieComponent>) { }

  ngOnInit() {
    this.newMovieForm = new FormGroup({
      movieName: new FormControl('', Validators.required),
      imdbRating: new FormControl('', Validators.required),
    });
  }

  closeDialog() {
    if (this.newMovieForm.valid) {
      this.dialogRef.close({
        movie_name: this.newMovieForm.value.movieName,
        imdb_rating: this.newMovieForm.value.imdbRating,
      });
    }
  }

}
