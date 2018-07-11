"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AstElement_1 = require("./AstElement");
class VariableElement extends AstElement_1.AstElement {
    static getType() {
        return {
            type: "VariableDeclaration",
            fromSelector(selector) {
                const results = /^(var|let|const)#(.*)/.exec(selector);
                if (results) {
                    return Object.assign({}, this, { kind: results[1], name: results[2], is(node) {
                            if (node.type === this.type && node.kind === this.kind) {
                                return (node.declarations.findIndex(item => item.id.name === this.name) >= 0);
                            }
                        } });
                }
            },
            fromNode(node, parents) {
                if (this.type === node.type) {
                    return new VariableElement(node, parents);
                }
            }
        };
    }
}
exports.VariableElement = VariableElement;
//# sourceMappingURL=VariableElement.js.map