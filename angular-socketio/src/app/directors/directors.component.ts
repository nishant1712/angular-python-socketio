import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDirectorComponent } from '../add-director/add-director.component';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent implements OnInit {

  directors: any;
  showDirectorsInfoAlert: boolean;

  constructor(public webSocketService: WebSocketService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.showDirectorsInfoAlert = false;
    this.getDirectors();
  }

  getDirectors() {
    this.webSocketService.createDirectorsRoom('director');
    this.webSocketService.getDirectors('director').subscribe(response => {
      if (response) {
        this.directors = response;
        this.showDirectorsInfoAlert =  true;
      }
    },
    err => console.error('Observer got an error: ' + err),
    () => console.log('Observer got a complete notification'));
  }

  addDirector() {
    const dialogRef = this.dialog.open(AddDirectorComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.webSocketService.addDirector({name: response.director_name, value: []}, 'director');
      }
    });
  }

  removeDirector(removeDirectorIndex: number) {
    this.webSocketService.removeDirector(removeDirectorIndex, 'director');
  }

}
