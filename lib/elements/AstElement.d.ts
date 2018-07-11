export declare class AstElement {
    node: any;
    parents: any[];
    constructor(node: any, parents?: any[]);
    find(selector: string): any[];
    parent(index?: number): AstElement;
    parentType(type: string): AstElement;
    print(): string;
    remove(): this;
    replace(node: any): this;
    static getType(): {
        fromNode(node: any, parents: any[]): AstElement;
    };
}
