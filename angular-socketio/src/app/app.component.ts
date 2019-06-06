import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Movie Buzz';
  directorIndex: number;

  directorSelected($event: any) {
    console.log($event);
    this.directorIndex = $event;
  }
}
