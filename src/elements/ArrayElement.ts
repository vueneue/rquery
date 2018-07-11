import { AstElement } from './AstElement';
import createFromNode from '../utils/createFromNode';

export class ArrayElement extends AstElement {
  public get(index: number): AstElement {
    return createFromNode(this.node.elements[index], [
      ...this.parents,
      this.node,
    ]);
  }

  public append(value: any) {
    this.node.elements.push(value);
    return this;
  }

  public prepend(value: any) {
    this.node.elements.unshift(value);
    return this;
  }

  public insertAt(value: any, index: number) {
    this.node.elements.splice(index, 0, value);
    return this;
  }

  public static getType() {
    return {
      type: 'ArrayExpression',
      fromSelector(selector: string) {
        const results = /^\[\]([0-9]*|\$|\^)$/.exec(selector);
        if (results) {
          return {
            ...this,
            index: results[1],
            is(node: any) {
              return node.type === this.type;
            },
          };
        }
      },
      fromNode(node: any, parents: any[]) {
        if (this.type === node.type) {
          return new ArrayElement(node, parents);
        }
      },
    };
  }
}
