"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AstElement_1 = require("./AstElement");
const createFromNode_1 = require("../utils/createFromNode");
class ArrayElement extends AstElement_1.AstElement {
    get(index) {
        return createFromNode_1.default(this.node.elements[index], [
            ...this.parents,
            this.node,
        ]);
    }
    append(value) {
        this.node.elements.push(value);
        return this;
    }
    prepend(value) {
        this.node.elements.unshift(value);
        return this;
    }
    insertAt(value, index) {
        this.node.elements.splice(index, 0, value);
        return this;
    }
    static getType() {
        return {
            type: 'ArrayExpression',
            fromSelector(selector) {
                const results = /^\[\]([0-9]*|\$|\^)$/.exec(selector);
                if (results) {
                    return Object.assign({}, this, { index: results[1], is(node) {
                            return node.type === this.type;
                        } });
                }
            },
            fromNode(node, parents) {
                if (this.type === node.type) {
                    return new ArrayElement(node, parents);
                }
            },
        };
    }
}
exports.ArrayElement = ArrayElement;
//# sourceMappingURL=ArrayElement.js.map