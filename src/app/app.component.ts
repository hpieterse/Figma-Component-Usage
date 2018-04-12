import { Component, ViewChild } from '@angular/core';
import { FigmaPlatformService } from './figma-platform.service';
import { FigmaError } from './figma-error';
import { FigmaProject } from './figma-project';
import { FigmaFileDetailsComponent } from './figma-file-details/figma-file-details.component';
import { FigmaFile } from './figma-file';
import { environment } from '../environments/environment';
import { FigmaAuthenticationService } from './figma-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(FigmaFileDetailsComponent) figmaFileDetails: FigmaFileDetailsComponent;

  constructor(private figmaPlatformService: FigmaPlatformService, private authenticationService: FigmaAuthenticationService) {

  }

  public get isAuthenticated() {
    return this.authenticationService.isAuthenticated;
  }
}
