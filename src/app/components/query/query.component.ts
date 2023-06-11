import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent {
  code = ``;
  editorOptions = { theme: 'vs-dark', language: 'sql', FontFace: 'JetBrains Mono' };

  constructor() {
  }

  onInit(editor: any) {
    editor.updateOptions({
      fontFamily: 'JetBrains Mono'
    })
  }
}
