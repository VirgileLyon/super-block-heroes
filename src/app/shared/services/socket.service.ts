import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  myPlayerIndex: number;
  room = {
    players: [],
    messages: [],
    monster: {},
    started: false,
  };

  time = 5;

  constructor(private socket: Socket, private authService: AuthService, private router: Router) {}

  sendEvent(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  getMessage(): Observable<any> {
    return this.socket.fromEvent('message');
  }

  getRoom(): void {
    this.socket.fromEvent('room').subscribe((room: any) => {
      console.log({ room });
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < room.players.length; i++) {
        if (room.players[i].nickname === this.authService.user.nickname) {
          this.myPlayerIndex = i;
        }
      }
      this.room = room;
      if (this.room.started && this.router.url !== '/game') {
        this.startGame();
      }
    });
  }

  startGame(): void {
    setTimeout(() => {
      if (this.time > 0) {
        this.time--;
        this.startGame();
      } else {
        this.router.navigateByUrl('/game');
      }
    }, 1000);
  }

  getGameEvent(): Observable<any> {
    return this.socket.fromEvent('gameEvent');
  }
}
