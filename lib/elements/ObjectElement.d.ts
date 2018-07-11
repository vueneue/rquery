import { AstElement } from './AstElement';
export declare class ObjectElement extends AstElement {
    get(key: string): AstElement;
    set(key: string, value: any, index?: number): this;
    static getType(): {
        type: string;
        fromSelector(selector: string): any;
        fromNode(node: any, parents: any[]): ObjectElement;
    };
}
