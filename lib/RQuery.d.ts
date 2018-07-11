import { AstElement } from './elements';
export declare class RQuery {
    static parse(source: string): AstElement;
    static print(element: AstElement, options?: any): Promise<string>;
    static createProperty(key: string, value: any): any;
}
