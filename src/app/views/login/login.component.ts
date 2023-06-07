import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _VIDEO_TRANSITION: any;
  errorMsg: string = '';
  credentials = {
    db: '',
    user: '',
    pass: ''
  }
  createConnModal: boolean = false;

  constructor(private _router: Router, private _dbService: DbService) {}

  ngOnInit() {
    this._transitionHandler();
  }

  async login() {
    if (!this.credentials.db || !this.credentials.user || !this.credentials.pass) {
      this.errorMsg = 'Please fill all the fields.';
      return;
    }

    let connection = await this._dbService.connect(this.credentials.db, this.credentials.user, this.credentials.pass);
    if (connection) {
      this.errorMsg = '';
      document.querySelector('#transition')?.classList.remove('hidden');
      document.querySelector('#transition')?.addEventListener('animationend', (e: any) => {
        if (e.animationName.endsWith('fadeOut')) {
          this._router.navigate(['/home']);
        }
      });
    } else {
      this.errorMsg = 'Wrong credentials. Try again.';
    }
  }

  shouldCloseModal(e: any) {

  }

  private _transitionHandler() {
    this._VIDEO_TRANSITION = document.querySelector('#video-transition');
    this._VIDEO_TRANSITION.addEventListener('ended', () => {
      this._VIDEO_TRANSITION.classList.add('fadeOut');
    });
    this._VIDEO_TRANSITION.addEventListener('animationend', (e: any) => {
      if (e.animationName.endsWith('fadeOut')) {
        this._VIDEO_TRANSITION.classList.remove('fadeOut');
        this._VIDEO_TRANSITION.classList.add('hidden');
        document.querySelector('main')?.classList.remove('hidden');
      }
    });
  }
}
