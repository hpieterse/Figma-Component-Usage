import { Component } from '@angular/core';
import { FigmaFile } from '../figma-file';
import { FigmaPlatformService } from '../figma-platform.service';
import { FigmaFileDetails } from '../figma-file-details';
import { FigmaNode } from '../figma-node';
import { FigmaNodeSearchResult } from '../figma-node-search-result';
import { FigmaNodeType } from '../figma-node-type.enum';
import { FigmaError } from '../figma-error';
import { ComponentUsage } from '../component-usage';
import { FigmaInstance } from '../figma-instance';

@Component({
  selector: 'app-figma-file-details',
  templateUrl: './figma-file-details.component.html',
  styleUrls: ['./figma-file-details.component.scss']
})
export class FigmaFileDetailsComponent {
  public loading = false;
  private fileDetails: FigmaFileDetails;
  public errorMessage: string;
  public componentList: Array<ComponentUsage> = [];
  public instanceList: Array<ComponentUsage> = [];
  public nestedInstanceList: Array<ComponentUsage> = [];

  constructor(private figmaPlatformService: FigmaPlatformService) {

  }

  public async loadFile(fileKey: string) {

    try {
      this.loading = true;
      this.errorMessage = '';
      this.fileDetails = await this.figmaPlatformService.getFileByKey(fileKey);


      this.analyseComponentDefinitions();
      this.analyseOrphans();
    } catch (error) {
      if (error instanceof FigmaError) {
        this.errorMessage = error.message;
      } else {
        throw error;
      }
    } finally {
      this.loading = false;
    }
  }

  private analyseComponentDefinitions() {
    this.componentList = [];
    const localComponents = this.fileDetails.document.findWhere((node) => {
      if (node.isComponent) {
        return new FigmaNodeSearchResult(true, true);
      }

      return new FigmaNodeSearchResult(false, true);
    });

    localComponents.forEach((component) => {
      const usageResult: ComponentUsage = Object.assign(new ComponentUsage(), component);
      usageResult.usages = this.fileDetails.document.findWhere((node) => {
        return new FigmaNodeSearchResult(node.isInstanceOf(component), true);
      });
      this.componentList.push(usageResult);
    });
  }

  private analyseOrphans() {
    this.instanceList = [];
    this.nestedInstanceList = [];

    // find all nodes that are not listed as a instance of a local component
    const orphans = this.fileDetails.document.findWhere((node) => {
      if (node.IsInstance) {
        if (this.componentList.filter((c) => node.isInstanceOf(c)).length === 0) {
          return new FigmaNodeSearchResult(true, true);
        }
      }

      return new FigmaNodeSearchResult(false, true);
    });

    const uniqueNames: Array<string> = [];
    const uniqueComponentIds: Array<string> = [];
    orphans.forEach((orphanNode) => {
      
      if ((orphanNode as FigmaInstance).componentId != null) {
        if (!uniqueComponentIds.includes((orphanNode as FigmaInstance).componentId)) {
          uniqueComponentIds.push((orphanNode as FigmaInstance).componentId);
        }
      } else {
        if (!uniqueNames.includes(orphanNode.name)) {
          uniqueNames.push(orphanNode.name);
        }
      }
    });

    uniqueComponentIds.forEach((uniqueComponentId) => {
      
      // find one instance of the component with the given unique component ID
      const matchedOrphan = orphans.find((orphanNode) =>
        (orphanNode as FigmaInstance).componentId === uniqueComponentId);
      let result : ComponentUsage = Object.assign(new ComponentUsage(), matchedOrphan);
      
      // go through orphan list and find all the items that match one of the 
      // unique component ids or the name of the component (assume here that
      // if the name matches, it's the same component)
      orphans.forEach((orphanNode) => {
        if ((orphanNode as FigmaInstance).componentId === uniqueComponentId) {
          result.usages.push(orphanNode);
        } else if (orphanNode.name === matchedOrphan.name) {
          result.usages.push(orphanNode);
        }
      });

      this.instanceList.push(result);
    });

    const instanceNames = this.instanceList.map((c) => c.name);
    // find all orphans without component ids that are not asigned to the instance list
    uniqueNames.forEach((uniqueOrphanName) => {
      if(instanceNames.findIndex((n) => n === uniqueOrphanName) < 0){
        let result: ComponentUsage = null;
        orphans.forEach((orphanNode) => {
          if ((orphanNode as FigmaInstance).componentId == null && orphanNode.name === uniqueOrphanName) {
            if (result == null) {
              result = Object.assign(new ComponentUsage(), orphanNode);
            }
            result.usages.push(orphanNode as FigmaInstance);
          }
        });

        this.nestedInstanceList.push(result);
      }
    });
  }
}
