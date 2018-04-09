import { Component, ViewChild } from '@angular/core';
import { FigmaPlatformService } from './figma-platform.service';
import { FigmaError } from './figma-error';
import { FigmaProject } from './figma-project';
import { FigmaFileDetailsComponent } from './figma-file-details/figma-file-details.component';
import { FigmaFile } from './figma-file';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Figma Component Usage';
  public errorMessage: string;
  public projects: Array<FigmaProject>;

  public initialPrivateKey: string;
  public initialTeamId: string;
  public initialFileKey: string;

  @ViewChild(FigmaFileDetailsComponent) figmaFileDetails: FigmaFileDetailsComponent;

  constructor(private figmaPlatformService: FigmaPlatformService) {
    this.projects = [];
    if(environment != null){
      this.initialPrivateKey = environment.privateKey;
      this.initialTeamId = environment.teamId;
      this.initialFileKey = environment.fileKey;
    }
  }

  public async getFiles(privateKey: string, teamId: string) {
    this.errorMessage = '';
    try {
      this.figmaPlatformService.init(privateKey, teamId);
      this.projects = await this.figmaPlatformService.getProjects();
    } catch (error) {
      if (error instanceof FigmaError) {
        this.errorMessage = error.message;
      } else {
        throw error;
      }
    }
  }

  public async loadFile(privateKey: string, teamId: string, fileKey: string) {
    this.figmaPlatformService.init(privateKey, teamId);
    this.figmaFileDetails.loadFile(fileKey);
  }
}
