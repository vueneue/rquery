"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prettier = require("prettier");
const recast = require("recast");
const elements_1 = require("./elements");
const Recast_1 = require("./Recast");
class RQuery {
    static parse(source) {
        return new elements_1.AstElement(Recast_1.Recast.parse(source));
    }
    static async print(element, options = {}) {
        let code = Recast_1.Recast.print(element.node);
        options = Object.assign({ resolveFrom: process.cwd(), prettier: 'babylon' }, options);
        if (options.prettier) {
            const prettierConfig = await prettier.resolveConfig(options.resolveFrom);
            code = prettier.format(code, Object.assign({}, prettierConfig, { parser: options.prettier }));
        }
        return code;
    }
    static createProperty(key, value) {
        const builder = recast.types.builders;
        const id = builder.identifier(key);
        return builder.objectProperty(id, value);
    }
}
exports.RQuery = RQuery;
//# sourceMappingURL=RQuery.js.map