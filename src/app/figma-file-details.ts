import { Url } from 'url';
import { FigmaComponent } from './figma-component';
import { FigmaDocument } from './figma-document';
import { FigmaFileDetailsJson } from './figma-file-details-json';
import { FigmaComponentJson } from './figma-component-json';
import { FigmaFile } from './figma-file';

export class FigmaFileDetails {
    public name: string;
    public lastModified: Date;
    public thumbnailUrl: Url;
    public document: FigmaDocument;
    public scemaVersion: number;
    public components: Map<string, FigmaComponent>;
    public file: FigmaFile;

    static fromJSON(json: FigmaFileDetailsJson): FigmaFileDetails {
        const components = new Map<string, FigmaComponent>();
        for (const key of Object.keys(json.components)) {
            components.set(key, FigmaComponent.fromJSON(json.components[key]));
        }

        return Object.assign(new FigmaFileDetails(), json, {
            document: FigmaDocument.fromJSON(json.document),
            components: components
        });
    }
}
