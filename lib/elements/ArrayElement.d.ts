import { AstElement } from './AstElement';
export declare class ArrayElement extends AstElement {
    get(index: number): AstElement;
    append(value: any): this;
    prepend(value: any): this;
    insertAt(value: any, index: number): this;
    static getType(): {
        type: string;
        fromSelector(selector: string): any;
        fromNode(node: any, parents: any[]): ArrayElement;
    };
}
