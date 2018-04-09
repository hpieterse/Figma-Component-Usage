import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FigmaProject } from '../figma-project';
import { FigmaFile } from '../figma-file';
import { FigmaPlatformService } from '../figma-platform.service';
import { FigmaError } from '../figma-error';

@Component({
  selector: 'app-figma-project',
  templateUrl: './figma-project.component.html',
  styleUrls: ['./figma-project.component.scss']
})
export class FigmaProjectComponent implements OnInit {

  @Input() project: FigmaProject;
  @Output() onFileLoad = new EventEmitter<FigmaFile>();
  public errorMessage: string;

  constructor(private figmaPlatformService: FigmaPlatformService) {

  }

  ngOnInit() {
    this.loadFiles();
  }

  public onFileLoadIntermediate(file: FigmaFile) {
    this.onFileLoad.emit(file);
  }
  private async loadFiles() {
    try {
      this.project.files = await this.figmaPlatformService.getFiles(this.project.id);
    } catch (error) {
      if (error instanceof FigmaError) {
        this.errorMessage = error.message;
      } else {
        throw error;
      }
    }

  }

}
