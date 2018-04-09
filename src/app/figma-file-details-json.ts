import { FigmaDocumentJson } from './figma-document-json';
import { FigmaComponentJson } from './figma-component-json';

export interface FigmaFileDetailsJson {
    name: string;
    lastModified: string;
    thumbnailUrl: string;
    document: FigmaDocumentJson;
    scemaVersion: number;
    components: Map<String, FigmaComponentJson>;
}
