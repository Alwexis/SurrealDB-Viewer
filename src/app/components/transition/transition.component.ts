import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'surreal-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.scss']
})
export class TransitionComponent implements OnInit {
  private _VIDEO_TRANSITION: any;
  
  public ngOnInit() {
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
