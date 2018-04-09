import { FigmaFile } from './figma-file';
import { FigmaProjectJson } from './figma-project-json';

export class FigmaProject {
    public id: string;
    public name: string;
    public files: Array<FigmaFile>;

    static fromJSON(json: FigmaProjectJson | string): FigmaProject {
        return Object.assign(new FigmaProject(), json, {});
    }
}
