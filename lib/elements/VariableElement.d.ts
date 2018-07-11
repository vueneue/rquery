import { AstElement } from "./AstElement";
export declare class VariableElement extends AstElement {
    static getType(): {
        type: string;
        fromSelector(selector: string): any;
        fromNode(node: any, parents: any[]): VariableElement;
    };
}
