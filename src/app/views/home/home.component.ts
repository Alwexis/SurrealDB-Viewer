import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { Surreal } from 'surrealdb.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  DBName?: string;
  activeTab = 'home';
  private static currentInstance: HomeComponent;

  constructor(private _router: Router, private _dbService: DbService) {
    HomeComponent.currentInstance = this;
  }

  async ngOnInit() {
    if (!DbService.initializated) {
      this._router.navigate(['/']);
    }
    // await this._dbService.connect('test', 'root', 'root');
    this.DBName = this._dbService.getDatabaseName();
  }

  changeTab(newTab: string) {
    if (this.activeTab === newTab) return;
    this.activeTab = newTab;
    document.querySelector('.option.active')?.classList.remove('active');
    document.querySelector(`#${newTab}`)?.classList.add('active');
  }

  public static _changeTab(newTab: string) {
    const instance = HomeComponent.currentInstance;
    if (instance.activeTab === newTab) return;
    instance.activeTab = newTab;
  }
}
