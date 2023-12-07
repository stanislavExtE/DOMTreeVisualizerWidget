import { TreeNode, ParserRootElement } from "./Parser.types";

export class Parser {
  private rootElement: ParserRootElement;

  constructor(rootElement: ParserRootElement) {
    this.rootElement = rootElement;
  }

  public getParsedDOMTree({
    element = this.rootElement,
    depth,
  }: { element?: Node; depth?: number | undefined } = {}): TreeNode {
    if (!element) {
      return null;
    }

    const tree: TreeNode = {
      element: element as HTMLElement,
      tagName: (element as Element).tagName?.toLowerCase(),
      isParent: true,
      children: [],
    };

    if ((element.nodeType === 1) && (element as Element).classList.length > 0) {
      tree.className = (element as Element).classList.value;
    }
    if ((element.nodeType === 1) && (element as Element).id) {
      tree.id = (element as Element).id;
    }


    if (depth !== undefined && depth <= 0) {
      return tree;
    }

    let remainingDepth = depth !== undefined ? depth - 1 : undefined;
    // let hasNonTextChild = Parser.hasNonTextChild(element);


    for (const child of element.childNodes) {
     
      const parsedChild = this.getParsedDOMTree({
        element: child,
        depth: remainingDepth,
      });
      if (parsedChild) {
        if (
          parsedChild.tagName ||
          parsedChild.className ||
          (parsedChild.children && parsedChild.children.length > 0)
        ) {
          if (child.childNodes.length === 0 || (child.childNodes.length === 1 && child.childNodes[0].nodeType === 3)) parsedChild.isParent = false;
          tree.children.push(parsedChild);
          // hasNonTextChild = true;
        }
      }
    }

    return tree;
  }
}
