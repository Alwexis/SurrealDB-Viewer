import { Component } from '@angular/core';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent {
  addConnectionForm: boolean = false;
  connection: any = {
    name: '',
    user: '',
    pass: '',
    host: '',
    namespace: '',
    path: '',
  }

  // surreal start --user root --pass root file:C:\SurrealDB\MusicPro.db

  toggleConnectionForm() {
    let connectionArrow: any = document.querySelector('#add-conn-arrow');
    if (this.addConnectionForm) {
      this.addConnectionForm = false;
      connectionArrow.style.transform = 'rotate(0deg)';
    } else {
      this.addConnectionForm = true;
      connectionArrow.style.transform = 'rotate(90deg)';
    }
  }
}
