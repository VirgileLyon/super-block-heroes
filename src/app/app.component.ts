import { Component, OnInit } from '@angular/core';
import { DbService } from './shared/services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private dbService: DbService, private router: Router) {}
  ngOnInit() {
    this.router.navigate(['/login']);
    this.dbService.getMonsters();
    this.dbService.getHeroes();
    this.dbService.getCapacities();
    // this.dbService.postUser({
    //   email: 'player5@email.com',
    //   nickname: 'player5',
    //   password: 'password',
    //   hero: 3,
    // });
  }
}
