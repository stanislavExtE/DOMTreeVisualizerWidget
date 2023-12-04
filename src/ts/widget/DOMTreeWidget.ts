import { Parser } from "./Parser/Parser";
import {
  ParserOptions,
  ParserRootElement,
  TreeNode,
} from "./Parser/Parser.types";
import { WidgetUI } from "./UI/WidgetUI";
import { WidgetUIOptions } from "./UI/WidgetUI.types";

export default class DOMTreeWidget {
  private rootElement: ParserRootElement;
  private parser: Parser;
  private widgetUI: WidgetUI;

  constructor(parserOptions: ParserOptions & WidgetUIOptions = {}) {
    this.rootElement = parserOptions.rootElement || document.body;
    this.parser = new Parser(this.rootElement);
    this.widgetUI = new WidgetUI({
        highlightCallback: this.highlightElement.bind(this)
    });

    
    this.init();
  }

  private renderDropdowns(options: { depth?: number | undefined } = {}) {
    const domTree = this.parser.getParsedDOMTree(options);
    this.renderNode(this.widgetUI, domTree);
  }

  private renderNode(
    widgetUI: WidgetUI,
    treeNode: TreeNode,
    parentDropdown: HTMLElement | null = null
  ) {
    const dropdown = widgetUI.addDropdown(
      treeNode.tagName,
      treeNode.isParent,
      treeNode.element
    );
    dropdown.setAttribute("data-title", treeNode.tagName);

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("widget__dropdown__content");
    dropdown.appendChild(dropdownContent);

    if (parentDropdown) {
      parentDropdown.appendChild(dropdown);
    } else {
      widgetUI.tagsContainer.appendChild(dropdown);
    }

    if (treeNode.children && treeNode.children.length > 0) {
      for (const childNode of treeNode.children) {
        this.renderNode(widgetUI, childNode, dropdownContent);
      }
    }
  }

  private setupEventListeners(widgetUI: WidgetUI) {
    document.addEventListener("updateDepth", (event: CustomEvent<number>) => {
      widgetUI.clearDropdowns();
      this.renderDropdowns({ depth: event.detail });
    });

    document.addEventListener("resetDepth", () => {
      widgetUI.clearDropdowns();
      this.renderDropdowns(undefined);
    });
  }

  private highlightElement(element: HTMLElement | null) {
    const highlightedElements = document.querySelectorAll(".highlighted");
    highlightedElements.forEach((el) => el.classList.remove("highlighted"));

    if (element) {
      element.classList.add("highlighted");
    }
  }

  init() {
    this.renderDropdowns();
    this.setupEventListeners(this.widgetUI);
  }
}
