import { AstElement } from './AstElement';
export declare class NewElement extends AstElement {
    static getType(): {
        type: string;
        fromSelector(selector: string): any;
        fromNode(node: any, parents: any[]): NewElement;
    };
}
