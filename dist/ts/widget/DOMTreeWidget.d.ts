import { ParserOptions } from "./Parser/Parser.types";
import { WidgetUIOptions } from "./UI/WidgetUI.types";
export default class DOMTreeWidget {
    private rootElement;
    private parser;
    private widgetUI;
    private parserOptions;
    constructor(parserOptions?: ParserOptions & WidgetUIOptions);
    private renderDropdowns;
    private renderNode;
    private setupEventListeners;
    private highlightElement;
    init(): void;
}
