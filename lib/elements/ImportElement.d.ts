import { AstElement } from './AstElement';
export declare class ImportElement extends AstElement {
    static getType(): {
        type: string;
        fromSelector(selector: string): any;
        fromNode(node: any, parents: any[]): ImportElement;
    };
}
