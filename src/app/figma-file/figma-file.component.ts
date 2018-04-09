import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FigmaFile } from '../figma-file';
import { FigmaPlatformService } from '../figma-platform.service';
import { FigmaError } from '../figma-error';
import { FigmaNodeType } from '../figma-node-type.enum';
import { FigmaNode } from '../figma-node';
import { FigmaNodeSearchResult } from '../figma-node-search-result';
import { FigmaComponent } from '../figma-component';
import { FigmaFileDetails } from '../figma-file-details';
import { FigmaInstance } from '../figma-instance';

@Component({
  selector: 'app-figma-file',
  templateUrl: './figma-file.component.html',
  styleUrls: ['./figma-file.component.scss']
})
export class FigmaFileComponent {
  private fileDetails: FigmaFileDetails;

  @Input() file: FigmaFile;
  @Output() onFileLoad = new EventEmitter<void>();

  public localInstances: Array<FigmaNode> = [];

  constructor() { }

  public loadFile() {
    this.onFileLoad.emit();
  }
}
