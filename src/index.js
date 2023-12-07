// import './styles/style.scss'
// import DOMTreeWidget from "./ts/widget/DOMTreeWidget";
import './styles/index.scss';
import DOMTreeWidget from './ts/widget/DOMTreeWidget';
import { ParserOptions } from "./ts/widget/Parser/Parser.types";
import { WidgetUIOptions } from "./ts/widget/UI/WidgetUI.types";


export default function TestWidget(options) {
  return new DOMTreeWidget(options);
}

// export class Widget extends DOMTreeWidget {}

// document.addEventListener("DOMContentLoaded", function() {
//     // const treeParser = new DOMTreeParser(document.body);
//     // treeParser.render();

//     const main = document.querySelector('.main');
//     const widget = new DOMTreeWidget({
//       rootElement: main,
//       openTreeByDefault: true,
//       shownWidgetByDefault: false,
//     });
//   });