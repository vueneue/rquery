import { AstElement } from "./AstElement";
export declare class ExportElement extends AstElement {
    static getType(): {
        fromSelector(selector: string): any;
        fromNode(node: any, parents: any[]): ExportElement;
    };
}
