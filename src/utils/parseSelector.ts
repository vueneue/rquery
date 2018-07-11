export default (selector: string): any[] => {
  // Remove useless spaces
  selector = selector
    .replace(/(\(|\{|\[])(\s*)/g, '$1')
    .replace(/(\s*)(\)|\}|\])/g, '$2');

  // Split elements
  const items = selector.split(/\s/);
  const elementsTypes = require('../elements');
  const elements = [];

  for (const item of items) {
    let el = item;

    for (const typeName in elementsTypes) {
      const type = elementsTypes[typeName].getType();
      if (type.fromSelector) {
        const createItem = type.fromSelector.bind(type);
        if (createItem && (el = createItem(item))) {
          break;
        }
      }
    }

    if (!el) el = item;
    elements.push(el);
  }

  return elements;
};
