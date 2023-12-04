export type ParserOptions = {
    rootElement?: HTMLElement;
    depth?: number;
}

export type ParserRootElement = Pick<ParserOptions, 'rootElement'>['rootElement'];

export type TreeNode = {
    tagName: string;
    className?: string;
    element?: HTMLElement;
    id?: string;
    isParent: boolean;
    children?: TreeNode[];
  }