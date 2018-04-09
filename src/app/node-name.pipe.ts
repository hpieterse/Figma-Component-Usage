import { Pipe, PipeTransform } from '@angular/core';
import { FigmaNode } from './figma-node';

@Pipe({
  name: 'nodeName'
})
export class NodeNamePipe implements PipeTransform {

  transform(value: Array<FigmaNode>, searchString: string): Array<FigmaNode> {
    if (searchString == null || searchString.trim().length === 0) {
      return value;
    }
    return value.filter((c) => {
      const name = c.name.toLowerCase();
      const search = searchString.trim().toLowerCase();
      return name.includes(search);
    });
  }
}
