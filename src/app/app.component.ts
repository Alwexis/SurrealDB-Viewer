import { Component } from '@angular/core';
import { Surreal } from 'surrealdb.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SurrealDB-Viewer';
  private _DB?: Surreal;

  constructor() {
    // this._DB = new Surreal('http://127.0.0.1:8000/rpc');
  }
}
