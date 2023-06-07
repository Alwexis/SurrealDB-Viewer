import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket$?: WebSocket;
  private messages$ = new Subject<string>();
  private isDesktop?: boolean;

  constructor() { }

  async initializeWebSocket() {
    return new Promise((resolve, reject) => {
      try {
        if (this.isDesktop === false) {
          throw new Error('Ya se ha intentado inicializar el WebSocket desde el navegador.');
        }
        this.socket$ = new WebSocket('ws://localhost:3001');
        let timeElapsed = 0;
        let interval = setInterval(() => {
          if (this.socket$?.readyState === 1) {
            clearInterval(interval);
            this.isDesktop = true;
            resolve({ initializated: true });
          }
          timeElapsed += 100;
          if (timeElapsed >= 5000) {
            clearInterval(interval);
            reject({ initializated: false, error: 'Imposible conectar al Websocket. ¿Estás desde la aplicación de escritorio?' });
          }
        }, 100);
      } catch (e) {
        reject({ initializated: false, error: 'Imposible conectar al Websocket. ¿Estás desde la aplicación de escritorio?' });
      }
    });
  }

  listenToWebSocketMessages() {
    this.socket$?.addEventListener('message', (event) => {
      const message = event.data;
      this.messages$.next(message);
    });
  }

  public sendMessage(message: string) {
    this.socket$?.send(message);
  }

  isActive() {
    return this.socket$?.readyState === WebSocket.OPEN;
  }
}
