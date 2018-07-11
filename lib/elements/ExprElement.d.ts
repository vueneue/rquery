import { AstElement } from './AstElement';
export declare class ExprElement extends AstElement {
    static getType(): {
        type: string;
        fromSelector(selector: string): any;
        fromNode(node: any, parents: any[]): ExprElement;
    };
}
