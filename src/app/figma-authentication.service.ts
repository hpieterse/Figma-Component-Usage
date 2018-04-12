import { Injectable } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { environment } from '../environments/environment';
import { FigmaPlatformService } from './figma-platform.service';

@Injectable()
export class FigmaAuthenticationService {

  private _authToken = '';
  private _isAuthenticated = false;

  constructor() {
    window.addEventListener('message', (event) => {
      this._authToken = event.data;
    });
  }

  public async authenticate(): Promise<void> {
    this._isAuthenticated = false;
    return new Promise<void>((resolve, reject) => {
      const name = 'Figma Login';
      const specs = 'width=500,height=500';
      this._authToken = '';
      const authWindow = window.open(environment.authServerUrl, name, specs);

      const subscriber = IntervalObservable.create(300).subscribe(() => {
        if (authWindow.closed) {
          if (this._authToken.length <= 0) {
            reject('Authentication Aborted');
          } else {
            this._isAuthenticated = true;
            resolve();
          }
        }
      });
    });
  }

  public get authToken() {
    return this._authToken;
  }

  public get isAuthenticated() {
    return this._isAuthenticated;
  }
}
