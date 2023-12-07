import { translates } from "../../../lang/translates";
import { checkValidLocale } from "../../helpers/helpers";
import { LangOptions, WidgetUIOptions, WidgetUIProps } from "./WidgetUI.types";

export class WidgetUI {
  public widgetContainer: HTMLElement;
  public controlsContainer: HTMLElement;
  public tagsContainer: HTMLElement;
  private depthInput: HTMLInputElement;
  private langOptions: LangOptions;
  private updateButton: HTMLButtonElement;
  private resetButton: HTMLButtonElement;
  private messageContainer: HTMLElement;
  private showButton: HTMLButtonElement;
  private hideButton: HTMLButtonElement;
  private options: WidgetUIOptions & WidgetUIProps;

  constructor(options: WidgetUIOptions & WidgetUIProps) {
    this.options = options;

    this.createWidgetUI();
  }

  private createWidgetUI() {
    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add("widget");
    this.widgetContainer.id = 'DOMTreeWidget';
    const widgetContent = document.createElement("div");
    widgetContent.classList.add("widget__content");
    this.controlsContainer = this.createControls();
    this.tagsContainer = this.createTagsContainer();

    this.messageContainer = this.createMessageWindow(
      this.options.lang.translates.instructionMessage
    );

    this.widgetContainer.appendChild(widgetContent);
    widgetContent.appendChild(this.controlsContainer);
    widgetContent.appendChild(this.tagsContainer);
    widgetContent.appendChild(this.messageContainer);
    widgetContent.appendChild(this.tagsContainer);
    
    document.body.appendChild(this.widgetContainer);

  }


  private handleShowButtonClick() {
    this.showWidget();
  }

  private handleHideButtonClick() {
    this.hideWidget();
  }

  private hideWidget() {
    this.widgetContainer.classList.add('widget-hidden');
    this.showButton.style.display = 'block';
    this.hideButton.style.display = 'none';
  }

  private showWidget() {
    this.widgetContainer.classList.remove('widget-hidden');
    this.showButton.style.display = 'none';
    this.hideButton.style.display = 'block';
  }

  private createTagsContainer(): HTMLElement {
    const container = document.createElement("div");
    container.classList.add("widget__tags-container");
    return container;
  }

  private createControls(): HTMLElement {
    const controlsContainer = document.createElement("div");
    controlsContainer.classList.add("widget__controls-container");

    this.depthInput = this.createInput({
      id: "widget__depth-input",
      name: "widget__depth-input",
      className: "widget__depth-input",
    });
    this.updateButton = this.createButton({
      text: this.options.lang.translates.parseButton,
      id: "widget__update-button",
      className: "widget__btn",
      clickHandler: this.handleUpdateClick.bind(this),
    });
    this.resetButton = this.createButton({
      text: this.options.lang.translates.resetButton,
      id: "widget__reset-button",
      className: "widget__btn widget__btn_v-2",
      clickHandler: this.handleResetClick.bind(this),
    });
    this.showButton = this.createButton({
      text: '',
      id: 'widget__show-button',
      className: 'widget__btn-show',
      clickHandler: this.handleShowButtonClick.bind(this)
    });

    this.hideButton = this.createButton({
      text: '',
      id: 'widget__hide-button',
      className: 'widget__btn-hide',
      clickHandler: this.handleHideButtonClick.bind(this)
    });

    if (!this.options.shownWidgetByDefault) {
      this.hideWidget();
    }

    controlsContainer.appendChild(this.depthInput);
    controlsContainer.appendChild(this.updateButton);
    controlsContainer.appendChild(this.resetButton);
    controlsContainer.appendChild(this.hideButton);
    document.body.appendChild(this.showButton);

    return controlsContainer;
  }

  private createInput({
    id,
    className,
    name,
  }: {
    name?: string;
    id?: string;
    className?: string;
  }): HTMLInputElement {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    if (name) input.setAttribute("name", name);
    input.setAttribute("placeholder", this.options.lang.translates.depthInputPlaceholder);
    input.id = id;
    if (className) input.className = className;
    return input;
  }

  private createMessageWindow(message: string) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("widget__message");

    const messageText = document.createElement("div");
    messageText.classList.add("widget__message__text");
    messageText.textContent = message;
    messageContainer.appendChild(messageText);

    return messageContainer;
  }

  public removeMessageWidnow() {
    if (this.messageContainer) {
      this.messageContainer.remove();
      this.messageContainer = undefined;
    }
  }

  private createButton({
    text,
    id,
    className,
    clickHandler,
  }: {
    text: string;
    id?: string;
    className?: string;
    clickHandler: () => void;
  }): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    if (id) button.id = id;
    if (className) button.className = className;
    button.addEventListener("click", clickHandler);
    return button;
  }

  private handleUpdateClick() {
    const newDepth = parseInt(this.depthInput.value, 10);
    // if (!isNaN(newDepth)) {
    this.options.highlightCallback(null);
    this.dispatchEvent("updateDepth", newDepth);
    // }
  }

  private handleParseClick() {
    this.options.highlightCallback(null);
    this.dispatchEvent("parseDOM");
  }

  private handleResetClick() {
    this.options.highlightCallback(null);
    this.depthInput.value = undefined;
    this.dispatchEvent("resetDepth");
  }

  private dispatchEvent(eventName: string, payload?: any) {
    const event = new CustomEvent(eventName, { detail: payload });
    document.dispatchEvent(event);
  }

  public addDropdown(isParent: boolean, element: HTMLElement): HTMLElement {
    const dropdown = document.createElement("div");
    dropdown.classList.add("widget__dropdown");
    if (this.options.openTreeByDefault) {
      dropdown.classList.add("opened");
    }
    const titleElement = document.createElement("div");
    titleElement.classList.add("widget__dropdown-title");
    dropdown.appendChild(titleElement);
    const titleText = document.createElement("div");
    titleText.classList.add("widget__dropdown-title__text");
    const title = `${element.tagName.toLocaleLowerCase()}${
      element.id ? "#" + element.id : ""
    }${element.className ? "." + element.className : ""}`;
    titleText.textContent = title;
    titleElement.appendChild(titleText);

    const titleNavigation = document.createElement("div");
    titleNavigation.classList.add("widget__dropdown-title__navigation");
    titleElement.appendChild(titleNavigation);

    const titleAnchorButton = document.createElement("div");
    titleAnchorButton.classList.add("widget__dropdown-title__anchor-icon");
    titleNavigation.appendChild(titleAnchorButton);

    titleAnchorButton.addEventListener("click", () => {
      this.scrollToParsedElement(element);
    });

    if (isParent) {
      const titleDropdownButton = document.createElement("div");
      titleDropdownButton.classList.add("widget__dropdown-title__caret-icon");

      titleDropdownButton.addEventListener("click", () => {
        dropdown.classList.toggle("opened");
      });

      titleNavigation.appendChild(titleDropdownButton);
    }

    titleText.addEventListener("click", (e) => {
      this.options.highlightCallback(element);

      this.highlightTitle(titleText);
    });

    this.tagsContainer.appendChild(dropdown);

    return dropdown;
  }

  private highlightTitle(titleText: HTMLElement) {
    const allTitleTextElements = document.querySelectorAll(
      ".widget__dropdown-title__text.active"
    );
    allTitleTextElements.forEach((title) => {
      if (title !== titleText) {
        title.classList.remove("active");
      }
    });
    titleText.classList.toggle("active");
  }

  private scrollToParsedElement(element: HTMLElement) {
    const parsedElement = element;

    if (parsedElement) {
      const offsetTop = parsedElement.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  public clearDropdowns() {
    const tagsContainer = this.tagsContainer;
    while (tagsContainer.firstChild) {
      tagsContainer.innerHTML = "";
    }
  }
}
