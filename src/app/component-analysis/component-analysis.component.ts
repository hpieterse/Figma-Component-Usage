import { Component, ViewChild } from '@angular/core';
import { FigmaPlatformService } from '../figma-platform.service';
import { FigmaFileDetailsComponent } from '../figma-file-details/figma-file-details.component';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-component-analysis',
  templateUrl: './component-analysis.component.html',
  styleUrls: ['./component-analysis.component.scss']
})
export class ComponentAnalysisComponent {
  @ViewChild(FigmaFileDetailsComponent) figmaFileDetails: FigmaFileDetailsComponent;

  constructor(private figmaPlatformService: FigmaPlatformService) { }

  public loadFile(fileUrl: string) {
    const end = '/';
    const start = environment.figmaUrl;
    let fileKey = fileUrl;
    if (fileUrl.indexOf(start) >= 0) {
      const keyStart = fileUrl.indexOf(start) + start.length;
      const keyEnd = fileUrl.indexOf(end, keyStart);

      fileKey = fileUrl.substring(keyStart, keyEnd);
    }

    this.figmaFileDetails.loadFile(fileKey);
  }
}
