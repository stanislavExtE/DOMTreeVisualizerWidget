# DOM Tree Widget

The DOM Tree Widget is a JavaScript-based widget that allows users to visualize the DOM structure of a web page in a hierarchical tree format. It provides a user interface to interactively explore and navigate the DOM tree.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Classes](#classes)
  - [WidgetUI](#widgetui)
  - [Parser](#parser)
  - [DOMTreeWidget](#domtreewidget)

## Installation

Include widget.min.js file in your project to use the DOM Tree Widget(you can find it in /dist folder in repo).

<!-- Include the JavaScript files -->
<script src="widget.min.js"></script> -->


## Usage

Initialize the DOM Tree Widget by creating an instance of the DOMTreeWidget class. Pass the desired configuration options as an object to customize the widget's behavior.

```
document.addEventListener("DOMContentLoaded", function() {
  const main = document.querySelector('.main');
  const widget = new DOMTreeWidget({
    rootElement: main as HTMLElement,
    openTreeByDefault: false,
    shownWidgetByDefault: true,
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


## Classes

### WidgetUI

The WidgetUI class represents the user interface of the DOM Tree Widget. It provides methods to create and manipulate the widget's components, such as buttons, input fields, and the hierarchical tree view.

**Parameters**

| **Parameter:**            | Description                    |
|-------------------------|----------------------------------------------------------------------------------|
| **options:**            | An object containing configuration options for the widget.                     |
| **openTreeByDefault:**   | (Optional) Boolean indicating whether the tree should be open by default.       |
| **shownWidgetByDefault:**| (Optional) Boolean indicating whether the widget should be visible by default.   |
| **lang:**     | (Optional) An object specifying localization options(Default only for 'en' and 'ua').     |
| **lang.locale:**   | (Optional) String representing the desired language locale.      |
| **lang.translates:**| (Optional) An object with translation key-value pairs. You are free to replace each default text in UI.       |
| **lang.translates.parseButton:**| (Optional) A key with translation of parse button.        |
| **lang.translates.resetButton:**| (Optional) A key with translation of reset button.       |
| **lang.translates.instructionMessage:**| (Optional) A key with translation of intro message.       |
| **lang.translates.depthInputPlaceholder:**| (Optional) A key with translation of input placeholder.       | 


**Methods**

| **Method**                        | **Description**                                                           |
|--------------------------------------|---------------------------------------------------------------------------|
| **createWidgetUI():**                 | Creates the main structure of the widget.                                 |
| **createTagsContainer():**            | Creates the container for displaying tags in the widget.                 |
| **createControls():**                 | Creates the control buttons for the widget.                              |
| **createInput({ id, className, name }):**| Creates an input element with specified attributes.                   |
| **createMessageWindow(message):**    | Creates a message window with the provided message.                     |
| **removeMessageWindow():**            | Removes the message window from the widget.                               |
| **createButton({ text, id, className, clickHandler }):**| Creates a button with specified attributes.                |
| **handleUpdateClick():**              | Event handler for the "Update" button click.                              |
| **handleParseClick():**               | Event handler for the "Parse" button click.                               |
| **handleResetClick():**               | Event handler for the "Reset" button click.                               |
| **dispatchEvent(eventName, payload):**| Dispatches a custom event with the specified name and payload.           |
| **addDropdown(isParent, element):**   | Adds a dropdown element to the widget.                                    |
| **highlightTitle(titleText):**        | Highlights the selected title in the widget.                              |
| **scrollToParsedElement(element):**   | Scrolls the page to the specified parsed element.                        |
| **clearDropdowns():**                 | Clears all dropdown elements from the widget.                             |



### Parser

The Parser class is responsible for parsing the DOM tree structure and generating a hierarchical tree of TreeNode objects.

**Parameters** 

| **Parameter**   | **Description**                                              |
|------------------|--------------------------------------------------------------|
| **rootElement:** | The root HTML element from which to start parsing the DOM tree.|

**Methods**

| **Method**                          | **Description**                                                    |
|---------------------------------------|--------------------------------------------------------------------|
| **getParsedDOMTree({ element, depth })** | Recursively parses the DOM tree starting from the specified element with a specified depth.|



### DOMTreeWidget

The DOMTreeWidget class acts as the main controller for the DOM Tree Widget. It orchestrates the interaction between the Parser and WidgetUI classes.

**Parameters**

| **Parameter**       | **Description**                                               |
|----------------------|---------------------------------------------------------------|
| **parserOptions:**   | An object containing configuration options for the widget and parser.|
| **rootElement:**     | (Optional) The root HTML element for parsing the DOM tree.     |
| **openTreeByDefault:**| (Optional) Boolean indicating whether the tree should be open by default.|
| **lang:**            | (Optional) An object specifying localization options.          |
| **lang.locale:**          | (Optional) String representing the desired language locale.    |
| **lang.translates:**      | (Optional) An object with translation key-value pairs.         |

**Methods**

| **Method**                                          | **Description**                                                          |
|-----------------------------------------------------|--------------------------------------------------------------------------|
| **renderDropdowns(options):**                       | Renders the dropdown elements in the widget based on the parsed DOM tree.|
| **renderNode(widgetUI, treeNode, parentDropdown):** | Recursively renders a tree node in the widget.                           |
| **setupEventListeners(widgetUI):**                  | Sets up event listeners for custom events triggered by the widget.       |
| **highlightElement(element):**                      | Highlights the specified HTML element.                                   |
| **init():**                                         | Initializes the DOM Tree Widget by rendering the initial dropdowns and setting up event listeners.|