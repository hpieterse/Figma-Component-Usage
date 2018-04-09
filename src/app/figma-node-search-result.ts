export class FigmaNodeSearchResult {
    public addToList: boolean;
    public checkChildren: boolean;

    constructor(addToList: boolean, checkChildren: boolean) {
        this.addToList = addToList;
        this.checkChildren = checkChildren;
    }
}
