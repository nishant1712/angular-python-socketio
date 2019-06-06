import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private url = 'http://localhost:8089';
  private socket: any;

  constructor() {
    this.socket = io(this.url);
  }

  createDirectorsRoom(directorRoom: string) {
    this.socket.nsp = '/director';
    this.socket.emit('join_room', directorRoom);
  }

  getDirectors(directorRoom: string) {
    this.socket.emit('getDirectors', directorRoom);
    return Observable.create((observer) => {
      this.socket.on('getDirectorsResponse', (data) => {
        if (data) {
          observer.next(data);
        } else {
          observer.error('Unable To Reach Server');
        }
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  addDirector(newDirectorStub: any, directorRoom: string) {
    this.socket.emit('addDirector', newDirectorStub, directorRoom);
  }

  removeDirector(removeDirectorIndex: number, directorRoom: string) {
    this.socket.emit('removeDirector', removeDirectorIndex, directorRoom);
  }

  leaveDirectorsRoom(directorRoom: string) {
    this.socket.emit('leave_room', directorRoom);
  }

  createMoviesRoom(movieRoom: string) {
    this.socket.nsp = '/movie';
    this.socket.emit('join_room', movieRoom);
  }

  getMovies(directorIndex: number, movieRoom: string) {
    this.socket.emit('getMovies', directorIndex, movieRoom);
    return Observable.create((observer) => {
      this.socket.on('getMoviesResponse', (data) => {
        if (data) {
          observer.next(data);
        } else {
          observer.error('Unable To Reach Server');
        }
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  addMovie(directorIndex: number, newMovieStub: any, movieRoom: string) {
    this.socket.emit('addMovie', directorIndex, newMovieStub, movieRoom);
  }

  removeMovie(directorIndex: number, removeDirectorIndex: number, movieRoom: string) {
    this.socket.emit('removeMovie', directorIndex, removeDirectorIndex, movieRoom);
  }

  leaveMoviesRoom(movieRoom: string) {
    this.socket.emit('leave_room', movieRoom);
  }
}
