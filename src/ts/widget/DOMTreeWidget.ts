import { translates } from "../../lang/translates";
import { checkValidLocale } from "../helpers/helpers";
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
  private parserOptions: ParserOptions & WidgetUIOptions;

  constructor(parserOptions: ParserOptions & WidgetUIOptions = {}) {
    this.parserOptions = parserOptions;

    this.rootElement = this.parserOptions.rootElement || document.body;
    const locale =
      checkValidLocale(Object.keys(translates), this.parserOptions?.lang?.locale) ||
      checkValidLocale(Object.keys(translates), navigator.language) ||
      checkValidLocale(
        Object.keys(translates),
        (document.documentElement.lang || "").toLowerCase()
      ) ||
      "en";
    const translations = translates[locale];
    const userTranslations = this.parserOptions?.lang?.translates || {};
    this.parserOptions.lang = {
      locale: locale,
      translates: { ...translations, ...userTranslations },
    }
    
    this.parser = new Parser(this.rootElement);
    this.widgetUI = new WidgetUI({
        openTreeByDefault: this.parserOptions.openTreeByDefault || false,
        shownWidgetByDefault: this.parserOptions.shownWidgetByDefault === false ? false : true,
        lang: this.parserOptions.lang,
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
      treeNode.isParent,
      treeNode.element
    );
    
    dropdown.setAttribute("data-title", treeNode.tagName);

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("widget__dropdown-content");
    const dropdownContentWrapper = document.createElement("div");
    dropdownContentWrapper.classList.add("widget__dropdown-content-wrapper");
    dropdownContentWrapper.appendChild(dropdownContent);
    dropdown.appendChild(dropdownContentWrapper);

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
      widgetUI.removeMessageWidnow()
    });

    document.addEventListener("parseDOM", (event: CustomEvent<number>) => {
      widgetUI.clearDropdowns();
      this.renderDropdowns({ depth: this.parserOptions.depth });
      widgetUI.removeMessageWidnow()
    });

    document.addEventListener("resetDepth", () => {
      widgetUI.clearDropdowns();
      this.renderDropdowns(undefined);
    });
  }

  private highlightElement(element: HTMLElement | null) {
    const highlightedElements = document.querySelectorAll(".highlighted");
    highlightedElements.forEach((el) => {
      if (el !== element)
      el.classList.remove("highlighted")
    });

    if (element) {
      element.classList.toggle("highlighted");
    }
  }


  init() {
    this.setupEventListeners(this.widgetUI);
  }
}

