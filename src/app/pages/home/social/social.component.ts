import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
})
export class SocialComponent implements OnInit {
  selectedCategory = 'friends';
  constructor(private authservice: AuthService) {}

  accept(nickname) {
    this.authservice.addFriend(nickname, this.authservice.user.nickname);
  }
  ngOnInit() {
    this.authservice.getMyUser();
  }

  setSelectedCategory(str: string): void {
    this.selectedCategory = str;
  }
}
