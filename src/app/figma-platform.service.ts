import { Injectable } from '@angular/core';
import { FigmaProject } from './figma-project';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { FigmaResponseProjects } from './figma-response-projects';
import { FigmaFile } from './figma-file';
import { FigmaResponseFiles } from './figma-response-files';
import { FigmaFileDetails } from './figma-file-details';
import { FigmaFileDetailsJson } from './figma-file-details-json';
import { FigmaError } from './figma-error';
import { FigmaAuthenticationService } from './figma-authentication.service';

@Injectable()
export class FigmaPlatformService {
  private _apiEndpoint = 'https://api.figma.com/v1';
  private _httpOptions = null;

  private _authenticationToken: string;

  constructor(private http: HttpClient, private authenticationService: FigmaAuthenticationService) {

  }

  public init() {
    this._authenticationToken = this.authenticationService.authToken;

    this._httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._authenticationToken}`
      })
    };
  }

  public async getProjects(teamId: string): Promise<Array<FigmaProject>> {
    return (await this
      .callFigmaApi<FigmaResponseProjects>(`/teams/${teamId}/projects`))
      .projects.map((jsonProject) => FigmaProject.fromJSON(jsonProject));
  }

  public async getFiles(porjectId: string): Promise<Array<FigmaFile>> {
    return (await this.callFigmaApi<FigmaResponseFiles>(`/projects/${porjectId}/files`))
      .files.map((jsonFile) => FigmaFile.fromJSON(jsonFile));
  }

  public async getFileByKey(file: string): Promise<FigmaFileDetails> {
    const fileToReturn = FigmaFileDetails.fromJSON(await this.callFigmaApi<FigmaFileDetailsJson>(`/files/${file}`));

    return fileToReturn;
  }
  public async getFile(file: FigmaFile): Promise<FigmaFileDetails> {
    // check if the file has already been downloaded
    const fileToReturn = FigmaFileDetails.fromJSON(await this.callFigmaApi<FigmaFileDetailsJson>(`/files/${file.key}`));
    fileToReturn.file = file;

    return fileToReturn;
  }

  private async callFigmaApi<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.get<T>(`${this._apiEndpoint}${url}`, this._httpOptions).subscribe((results) => {
        resolve(results as any);
      }, (error) => {
        reject(FigmaError.fromJSON(error.error));
      });
    });
  }
}
