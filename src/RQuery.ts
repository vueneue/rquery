import * as prettier from 'prettier';
import * as recast from 'recast';
import { AstElement } from './elements';
import { Recast } from './Recast';

export class RQuery {
  public static parse(source: string): AstElement {
    return new AstElement(Recast.parse(source));
  }

  public static async print(
    element: AstElement,
    options: any = {},
  ): Promise<string> {
    let code = Recast.print(element.node);

    options = Object.assign(
      { resolveFrom: process.cwd(), prettier: 'babylon' },
      options,
    );

    if (options.prettier) {
      const prettierConfig = await prettier.resolveConfig(options.resolveFrom);
      code = prettier.format(code, {
        ...prettierConfig,
        parser: options.prettier,
      });
    }

    return code;
  }

  public static createProperty(key: string, value: any) {
    const builder = recast.types.builders;
    const id = builder.identifier(key);
    return builder.objectProperty(id, value);
  }
}
