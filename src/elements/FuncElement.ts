import { AstElement } from './AstElement';
import createFromNode from '../utils/createFromNode';

export class FuncElement extends AstElement {
  public getBody() {
    return createFromNode(this.node.body);
  }

  public static getType() {
    return {
      type: 'FunctionDeclaration',
      fromSelector(selector: string) {
        const results = /^func#(.*)/.exec(selector);
        if (results) {
          return {
            ...this,
            name: results[1],
            is(node: any) {
              if (node.type === this.type) {
                return node.id.name === this.name;
              }
            },
          };
        }
      },
      fromNode(node: any, parents: any[]) {
        if (this.type === node.type) {
          return new FuncElement(node, parents);
        }
      },
    };
  }
}
