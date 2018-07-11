"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recast = require("recast");
const babelParser = require("@babel/parser");
class Recast {
    static parse(source) {
        return recast.parse(source, {
            parser: Recast.parser,
        });
    }
    static print(ast) {
        return recast.print(ast).code;
    }
}
Recast.parser = {
    parse: source => babelParser.parse(source, {
        sourceType: 'module',
        plugins: [
            'classProperties',
            'decorators-legacy',
            'dynamicImport',
            'objectRestSpread',
            'typescript',
        ],
    }),
};
exports.Recast = Recast;
//# sourceMappingURL=Recast.js.map