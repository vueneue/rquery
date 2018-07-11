"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AstElement_1 = require("./AstElement");
class ImportElement extends AstElement_1.AstElement {
    static getType() {
        return {
            type: 'ImportDeclaration',
            fromSelector(selector) {
                const results = /^import(#([^@]*))?(@(.*))?$/.exec(selector);
                if (results) {
                    return Object.assign({}, this, { name: results[2], from: results[4], is(node) {
                            if (node.type !== this.type)
                                return false;
                            if (this.from) {
                                if (this.from !== node.source.value)
                                    return false;
                            }
                            if (this.name) {
                                let found = false;
                                for (const specifier of node.specifiers) {
                                    if (specifier.local.name === this.name) {
                                        found = true;
                                        break;
                                    }
                                }
                                if (!found)
                                    return false;
                            }
                            return true;
                        } });
                }
            },
            fromNode(node, parents) {
                if (node.type === this.type) {
                    return new ImportElement(node, parents);
                }
            },
        };
    }
}
exports.ImportElement = ImportElement;
//# sourceMappingURL=ImportElement.js.map