import { Component, Input } from '@angular/core';
import { FigmaNode } from '../figma-node';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-figma-node-location',
  templateUrl: './figma-node-location.component.html',
  styleUrls: ['./figma-node-location.component.scss']
})
export class FigmaNodeLocationComponent {

  @Input() node: FigmaNode;
  @Input() fileKey: string;

  constructor() { }

  public urlFromNode(node: FigmaNode) {
    if (node == null) {
      return null;
    }
    if (node.id.startsWith('I')) {
      return null;
    }
    return `https://www.${environment.figmaUrl}${this.fileKey}/?node-id=${node.id}`;
  }
}
