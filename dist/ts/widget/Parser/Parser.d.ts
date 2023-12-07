import { TreeNode, ParserRootElement } from "./Parser.types";
export declare class Parser {
    private rootElement;
    constructor(rootElement: ParserRootElement);
    getParsedDOMTree({ element, depth, }?: {
        element?: Node;
        depth?: number | undefined;
    }): TreeNode;
}
