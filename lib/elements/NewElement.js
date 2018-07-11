"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AstElement_1 = require("./AstElement");
const memberExpr_1 = require("../utils/memberExpr");
class NewElement extends AstElement_1.AstElement {
    static getType() {
        return {
            type: 'NewExpression',
            fromSelector(selector) {
                const results = /^new(#?(.*))$/.exec(selector);
                if (results) {
                    const className = results[2];
                    return Object.assign({}, this, { className,
                        is(node) {
                            if (this.type === node.type) {
                                if (this.className) {
                                    if (/\./.test(this.className)) {
                                        return memberExpr_1.default(node.callee) === this.className;
                                    }
                                    else {
                                        return node.callee.name === this.className;
                                    }
                                }
                                else {
                                    return true;
                                }
                            }
                            return false;
                        } });
                }
            },
            fromNode(node, parents) {
                if (this.type === node.type) {
                    return new NewElement(node, parents);
                }
            },
        };
    }
}
exports.NewElement = NewElement;
//# sourceMappingURL=NewElement.js.map