// import './styles/style.scss'
import DOMTreeWidget from "./ts/widget/DOMTreeWidget";
import './styles/index.scss';


document.addEventListener("DOMContentLoaded", function() {
    // const treeParser = new DOMTreeParser(document.body);
    // treeParser.render();

    const main = document.querySelector('.main');
    const widget = new DOMTreeWidget({
      rootElement: main as HTMLElement,
      // openTreeByDefault: true
    });
  });