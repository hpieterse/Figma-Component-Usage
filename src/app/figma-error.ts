import { FigmaErrorJson } from './figma-error-json';

export class FigmaError {
    public error: boolean;
    public status: number;
    public message: string;

    static fromJSON(json: FigmaErrorJson): FigmaError {
        const errorMessage = json.message || json.err || 'Unknown error occurred';
        console.error(json);
        return Object.assign(new FigmaError(), json, {
            message : errorMessage
        });
    }
}
