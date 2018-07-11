"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (node, parents = []) => {
    const elementsTypes = require('../elements/index');
    for (const typeName in elementsTypes) {
        const type = elementsTypes[typeName].getType();
        const el = type.fromNode(node, parents);
        if (el)
            return el;
    }
};
//# sourceMappingURL=createFromNode.js.map