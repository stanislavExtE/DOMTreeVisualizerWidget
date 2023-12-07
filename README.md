### DOM Tree Widget

**The DOM Tree Widget is a JavaScript-based widget that allows users to visualize the DOM structure of a web page in a hierarchical tree format. It provides a user interface to interactively explore and navigate the DOM tree.**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Classes](#classes)
  - [WidgetUI](#widgetui)
  - [Parser](#parser)
  - [DOMTreeWidget](#domtreewidget)

## Installation

**Include the necessary JavaScript and stylesheet files in your project to use the DOM Tree Widget. Ensure that you have a valid build process to transpile TypeScript files if needed.**
<!-- 
```html
<!-- Include the main stylesheet -->
<link rel="stylesheet" href="path/to/main.css">

<!-- Include the JavaScript files -->
<script src="path/to/main.js"></script> -->


## Usage

**Initialize the DOM Tree Widget by creating an instance of the DOMTreeWidget class. Pass the desired configuration options as an object to customize the widget's behavior.**

```
document.addEventListener("DOMContentLoaded", function() {
  const main = document.querySelector('.main');
  const widget = new DOMTreeWidget({
    rootElement: main as HTMLElement,
    openTreeByDefault: true,
    lang: {
      locale: 'en',
      translates: {
        parseButton: 'Parse',
        resetButton: 'Reset',
        instructionMessage: "Click 'Update' for Parsing DOM Tree",
      },
    },
    // Other configuration options...
  });
});
```