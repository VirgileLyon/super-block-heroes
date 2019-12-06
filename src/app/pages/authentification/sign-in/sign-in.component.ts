import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../../shared/services/db.service';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
// import { Monster } from 'src/app/shared/models/monster';
import { ShowPasswordDirective } from '../show-password.directive';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  user = {
    nickname: '',
    email: '',
    password: '',
  };
  faEye = faEye;
  showPasswordDirective = ShowPasswordDirective;

  constructor(private dbService: DbService, private router: Router) {}

  ngOnInit() {}

  forgotPW = () => {
    window.alert('This feature will be enable soon!');
  };

  signin = async () => {
    await this.dbService.login(this.user);
  };

  showPassword = () => {
    window.alert('show password');
  };
}
