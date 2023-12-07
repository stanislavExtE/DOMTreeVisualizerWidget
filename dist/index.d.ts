import './styles/index.scss';
import DOMTreeWidget from './ts/widget/DOMTreeWidget';
import { ParserOptions } from "./ts/widget/Parser/Parser.types";
import { WidgetUIOptions } from "./ts/widget/UI/WidgetUI.types";
export default function TestWidget(options: ParserOptions & WidgetUIOptions): DOMTreeWidget;
