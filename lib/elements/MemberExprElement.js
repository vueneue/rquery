"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AstElement_1 = require("./AstElement");
const memberExpr_1 = require("../utils/memberExpr");
class MemberExprElement extends AstElement_1.AstElement {
    static getType() {
        return {
            type: 'MemberExpression',
            fromSelector(selector) {
                const results = /^[a-z]+[a-z0-9\.]*[a-z]+/i.exec(selector);
                if (results) {
                    return Object.assign({}, this, { name: results[0], is(node) {
                            if (node.type === this.type) {
                                return memberExpr_1.default(node) === this.name;
                            }
                        } });
                }
            },
            fromNode(node, parents) {
                if (this.type === node.type) {
                    return new MemberExprElement(node, parents);
                }
            },
        };
    }
}
exports.MemberExprElement = MemberExprElement;
//# sourceMappingURL=MemberExprElement.js.map