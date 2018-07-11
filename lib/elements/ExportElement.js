"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AstElement_1 = require("./AstElement");
class ExportElement extends AstElement_1.AstElement {
    static getType() {
        return {
            fromSelector(selector) {
                const results = /^export(Default)?$/.exec(selector);
                if (results) {
                    const type = results[1]
                        ? "ExportDefaultDeclaration"
                        : "ExportNamedDeclaration";
                    return Object.assign({}, this, { type,
                        is(node) {
                            return node.type === this.type;
                        } });
                }
            },
            fromNode(node, parents) {
                if (node.type === "ExportDefaultDeclaration" ||
                    node.type === "ExportNamedDeclaration") {
                    return new ExportElement(node, parents);
                }
            }
        };
    }
}
exports.ExportElement = ExportElement;
//# sourceMappingURL=ExportElement.js.map