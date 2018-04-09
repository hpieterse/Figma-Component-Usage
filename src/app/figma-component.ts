import { FigmaComponentJson } from './figma-component-json';

export class FigmaComponent {
    public name: string;
    public description: string;

    static fromJSON(json: FigmaComponentJson): FigmaComponent {
        return Object.assign(new FigmaComponent(), json, {});
    }
}
