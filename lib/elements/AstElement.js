"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Recast_1 = require("../Recast");
const parseSelector_1 = require("../utils/parseSelector");
const findNodes_1 = require("../utils/findNodes");
const createFromNode_1 = require("../utils/createFromNode");
class AstElement {
    constructor(node, parents = []) {
        this.node = node;
        this.parents = parents;
    }
    find(selector) {
        const elements = parseSelector_1.default(selector);
        const results = findNodes_1.default(this.node.program ? this.node.program : this.node, elements);
        return results;
    }
    parent(index = 1) {
        if (this.parents.length) {
            const node = this.parents[this.parents.length - index];
            const parents = this.parents.slice(0, this.parents.length - index);
            return createFromNode_1.default(node, parents);
        }
    }
    parentType(type) {
        if (this.parents.length) {
            for (let i = this.parents.length - 1; i >= 0; i--) {
                const node = this.parents[i];
                if (node.type === type) {
                    return createFromNode_1.default(node, this.parents.slice(0, i));
                }
            }
        }
    }
    print() {
        return Recast_1.Recast.print(this.node);
    }
    remove() {
        if (!this.parents.length)
            throw new Error('Unable to remove without parents');
        const parent = this.parent();
        const parentNode = this.parent().node;
        const props = findNodes_1.getTraversableProps(parent.node);
        for (const prop of props) {
            if (Array.isArray(parentNode[prop])) {
                const index = parentNode[prop].findIndex(item => {
                    return item === this.node;
                });
                if (index >= 0) {
                    parentNode[prop].splice(index, 1);
                    break;
                }
            }
            else {
                if (parentNode[prop] === this.node) {
                    delete parentNode[prop];
                    break;
                }
            }
        }
        return this;
    }
    replace(node) {
        if (!this.parents.length)
            throw new Error('Unable to replace without parents');
        if (typeof node === 'string') {
            node = Recast_1.Recast.parse(node).program.body[0];
        }
        const parent = this.parent();
        const parentNode = this.parent().node;
        const props = findNodes_1.getTraversableProps(parent.node);
        for (const prop of props) {
            if (Array.isArray(parentNode[prop])) {
                const index = parentNode[prop].findIndex(item => {
                    return item === this.node;
                });
                if (index >= 0) {
                    this.node = node;
                    parentNode[prop][index] = node;
                    break;
                }
            }
            else {
                if (parentNode[prop] === this.node) {
                    this.node = node;
                    parentNode[prop] = node;
                    break;
                }
            }
        }
        return this;
    }
    static getType() {
        return {
            fromNode(node, parents) {
                return new AstElement(node, parents);
            },
        };
    }
}
exports.AstElement = AstElement;
//# sourceMappingURL=AstElement.js.map