import { AstElement } from './AstElement';
import createFromNode from '../utils/createFromNode';
import { RQuery } from '../RQuery';

export class ObjectElement extends AstElement {
  public get(key: string): AstElement {
    const prop = this.node.properties.find(item => item.key.name === key);
    if (prop) {
      return createFromNode(prop.value, [...this.parents, this.node, prop]);
    }
  }

  public set(key: string, value: any, index?: number) {
    const el = this.get(key);
    if (el) {
      el.replace(value);
    } else {
      const prop = RQuery.createProperty(key, value);
      if (!index) {
        this.node.properties.push(prop);
      } else {
        this.node.properties.splice(index, 0, prop);
      }
    }
    return this;
  }

  public static getType() {
    return {
      type: 'ObjectExpression',
      fromSelector(selector: string) {
        const results = /^\{\}(.*)$/.exec(selector);
        if (results) {
          return {
            ...this,
            propPath: results[1],
            is(node: any) {
              return node.type === this.type;
            },
          };
        }
      },
      fromNode(node: any, parents: any[]) {
        if (this.type === node.type) {
          return new ObjectElement(node, parents);
        }
      },
    };
  }
}
