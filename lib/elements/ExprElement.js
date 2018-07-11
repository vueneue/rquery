"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AstElement_1 = require("./AstElement");
class ExprElement extends AstElement_1.AstElement {
    static getType() {
        return {
            type: 'ExpressionStatement',
            fromSelector(selector) {
                const results = /^expr$/.exec(selector);
                if (results) {
                    return Object.assign({}, this, { is(node) {
                            return node.type === this.type;
                        } });
                }
            },
            fromNode(node, parents) {
                if (this.type === node.type) {
                    return new ExprElement(node, parents);
                }
            },
        };
    }
}
exports.ExprElement = ExprElement;
//# sourceMappingURL=ExprElement.js.map