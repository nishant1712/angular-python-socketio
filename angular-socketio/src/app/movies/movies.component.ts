import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';
import { AddMovieComponent } from '../add-movie/add-movie.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies: any;
  directorIndex: number;
  showMoviesInfoAlert: boolean;
  movieRoomName: string;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              public webSocketService: WebSocketService) { }

  ngOnInit() {
    this.showMoviesInfoAlert = false;
    this.leaveDirectorsRoom();
    this.directorIndex = +this.route.snapshot.paramMap.get('directorId');
    this.getMovies(this.directorIndex);
  }

  leaveDirectorsRoom() {
    this.webSocketService.leaveDirectorsRoom('director');
  }

  getMovies(directorIndex: number) {
    this.webSocketService.createMoviesRoom('director_' + this.directorIndex + '_movies');
    this.webSocketService.getMovies(directorIndex, 'director_' + this.directorIndex + '_movies').subscribe(response => {
      if (response) {
        this.movies = response.value;
        this.movieRoomName = 'director_' + this.directorIndex + '_movies';
        this.showMoviesInfoAlert = true;
      }
    },
    err => console.error('Observer got an error: ' + err),
    () => console.log('Observer got a complete notification'));
  }

  addMovie() {
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        // tslint:disable-next-line: max-line-length
        this.webSocketService.addMovie(this.directorIndex, {name: response.movie_name, imdb: response.imdb_rating}, 'director_' + this.directorIndex + '_movies');
      }
    });
  }

  removeMovie(removeMovieIndex: number) {
    this.webSocketService.removeMovie(this.directorIndex, removeMovieIndex, 'director_' + this.directorIndex + '_movies');
  }

  ngOnDestroy(): void {
    this.webSocketService.leaveMoviesRoom('director_' + this.directorIndex + '_movies');
  }

}
