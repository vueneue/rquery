"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AstElement_1 = require("./AstElement");
const createFromNode_1 = require("../utils/createFromNode");
const RQuery_1 = require("../RQuery");
class ObjectElement extends AstElement_1.AstElement {
    get(key) {
        const prop = this.node.properties.find(item => item.key.name === key);
        if (prop) {
            return createFromNode_1.default(prop.value, [...this.parents, this.node, prop]);
        }
    }
    set(key, value, index) {
        const el = this.get(key);
        if (el) {
            el.replace(value);
        }
        else {
            const prop = RQuery_1.RQuery.createProperty(key, value);
            if (!index) {
                this.node.properties.push(prop);
            }
            else {
                this.node.properties.splice(index, 0, prop);
            }
        }
        return this;
    }
    static getType() {
        return {
            type: 'ObjectExpression',
            fromSelector(selector) {
                const results = /^\{\}(.*)$/.exec(selector);
                if (results) {
                    return Object.assign({}, this, { propPath: results[1], is(node) {
                            return node.type === this.type;
                        } });
                }
            },
            fromNode(node, parents) {
                if (this.type === node.type) {
                    return new ObjectElement(node, parents);
                }
            },
        };
    }
}
exports.ObjectElement = ObjectElement;
//# sourceMappingURL=ObjectElement.js.map