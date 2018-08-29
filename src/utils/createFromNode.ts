import { AstElement } from '../elements';

export default (node: any, parents: any = []): AstElement => {
  const elementsTypes = require('../elements/index');
  for (const typeName in elementsTypes) {
    const type = elementsTypes[typeName].getType();
    if (type) {
      const el = type.fromNode(node, parents);
      if (el) return el;
    }
  }
};
