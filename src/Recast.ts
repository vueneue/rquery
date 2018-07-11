import * as recast from 'recast';
import * as babelParser from '@babel/parser';
import { AstElement } from './elements/AstElement';

export class Recast {
  public static parser = {
    parse: source =>
      babelParser.parse(source, {
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

  public static parse(source: string): any {
    return recast.parse(source, {
      parser: Recast.parser,
    });
  }

  public static print(ast: any): string {
    return recast.print(ast).code;
  }
}
