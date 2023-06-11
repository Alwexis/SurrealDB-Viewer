import { Component } from '@angular/core';
import { HomeComponent } from 'src/app/views/home/home.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  changeTab(tab: string) {
    HomeComponent._changeTab(tab);
  }
}
