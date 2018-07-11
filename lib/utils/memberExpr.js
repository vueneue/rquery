"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (node) => {
    let names = [];
    while (node && node.type === 'MemberExpression') {
        names.push(node.property.name);
        if (node.object.type === 'MemberExpression') {
            node = node.object;
        }
        else {
            if (node.object.type === 'Identifier') {
                names.push(node.object.name);
            }
            node = null;
        }
    }
    return names.reverse().join('.');
};
//# sourceMappingURL=memberExpr.js.map