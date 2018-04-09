import { Url } from 'url';
import { FigmaFileJson } from './figma-file-json';

export class FigmaFile {
    public key: string;
    public name: string;
    public thumbnailUrl: URL;
    public lastModified: Date;

    static fromJSON(json: FigmaFileJson): FigmaFile {
        return Object.assign(new FigmaFile(), json, {
            thumbnailUrl: new URL(json.thumbnail_url),
            lastModified: new Date(json.last_modified)
        });
    }
}
