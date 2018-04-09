import { FigmaNodeType } from './figma-node-type.enum';
import { FigmaNodeJson } from './figma-node-json';
import { FigmaNodeSearchResult } from './figma-node-search-result';
import { FigmaInstance } from './figma-instance';

export class FigmaNode {
    public id: string;
    public name: string;
    public type: FigmaNodeType;
    public children: Array<FigmaNode>;
    public parent: FigmaNode;
    public get location(): string {

        if (this.parent != null) {
            return `${this.parent.location} ${this.parent.location.length > 0 ? '>' : ''} ${this.parent.name}`;
        }
        return '';
    }

    static fromJSON(json: FigmaNodeJson, parent?: FigmaNode): FigmaNode {
        const newObject = new FigmaNode();
        return Object.assign(newObject, json, {
            children: json.children == null ? null : json.children.map((childNodeJson) => FigmaNode.fromJSON(childNodeJson, newObject)),
            parent: parent,
        });
    }

    public findWhere(check: (node: FigmaNode) => FigmaNodeSearchResult): Array<FigmaNode> {
        const results: Array<FigmaNode> = [];

        // check yourself (before you reck yourself)
        const checkResult = check(this);
        if (checkResult.addToList) {
            results.push(this);
        }

        if (checkResult.checkChildren) {
            // check children
            if (this.children != null) {
                this.children.forEach(childNode => {
                    results.push(...childNode.findWhere(check));
                });
            }
        }

        return results;
    }

    public get isInComponent(): boolean {
        return this.parent != null && (this.parent.isComponent || this.parent.isInComponent);
    }

    public get isComponent(): boolean {
        return this.type === FigmaNodeType.Component
            &&
            // sometimes nodes are marked as components when they are really instances,
            // This happens when a nested component is replaced with another component
            !this.id.startsWith('I');
    }

    public get IsInstance(): boolean {
        return this.type === FigmaNodeType.Instance
            ||
            // sometimes nodes are marked as components when they are really instances,
            // This happens when a nested component is replaced with another component
            this.type === FigmaNodeType.Component && !this.isComponent;
    }

    public isInstanceOf(component: FigmaNode): boolean {
        if (this.IsInstance) {
            // this is an instance of a component
            const componentId = ((this as any) as FigmaInstance).componentId;
            if (componentId == null) {
                // nested instances sometimes dont have component Ids
                // in that case assume the name of the component did not change
                return this.name === component.name;
            } else if (componentId === component.id) {
                return true;
            }
        }
        return false;
    }
}
