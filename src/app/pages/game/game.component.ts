import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { DbService } from '../../shared/services/db.service';

import { Game } from '../../shared/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  interval: any;
  game: Game;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.game.handleKeys(event.key);
  }

  constructor(private dbService: DbService) {}

  ngOnInit() {
    const rdmMonster = this.dbService.monsters[
      Math.floor(Math.random() * this.dbService.monsters.length)
    ];
    this.game = new Game(rdmMonster, [
      this.dbService.user,
      {
        nickname: 'Grogory',
        hero: this.dbService.heroes[5],
      },
      {
        nickname: 'Mayelle',
        hero: this.dbService.heroes[4],
      },
      {
        nickname: 'Bière',
        hero: this.dbService.heroes[6],
      },
    ]);
    this.interval = setInterval(() => this.gameLoop(), 20);
  }

  private gameLoop(): void {
    this.game.loop();
    if (this.game.victory || this.game.defeat) {
      clearInterval(this.interval);
      this.dbService.postGame(this.game);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
