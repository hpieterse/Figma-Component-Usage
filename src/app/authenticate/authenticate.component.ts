import { Component } from '@angular/core';
import { FigmaAuthenticationService } from '../figma-authentication.service';
import { FigmaPlatformService } from '../figma-platform.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent {

  public errorMessage: string;
  constructor(private authenticationService: FigmaAuthenticationService, private figmaPlatformService: FigmaPlatformService) { }

  public async authenticate() {
    try {
      this.errorMessage = '';
      await this.authenticationService.authenticate();
      this.figmaPlatformService.init();
    } catch (error) {
      this.errorMessage = error;
    }
  }
}
