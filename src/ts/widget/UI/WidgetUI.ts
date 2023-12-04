import { WidgetUIOptions, WidgetUIProps } from "./WidgetUI.types";

export class WidgetUI {
  public widgetContainer: HTMLElement;
  public controlsContainer: HTMLElement;
  public tagsContainer: HTMLElement;
  private highlightCallback: (element: HTMLElement) => void;
  private depthInput: HTMLInputElement;
  private updateButton: HTMLButtonElement;
  private resetButton: HTMLButtonElement;

  constructor(options: WidgetUIOptions & WidgetUIProps) {
    this.highlightCallback = options.highlightCallback;
    this.createWidgetUI();
  }

  private createWidgetUI() {
    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add("widget");
    const widgetContent = document.createElement("div");
    widgetContent.classList.add("widget__content");
    this.controlsContainer = this.createControls();
    this.tagsContainer = this.createTagsContainer();

    this.widgetContainer.appendChild(widgetContent);
    widgetContent.appendChild(this.controlsContainer);
    widgetContent.appendChild(this.tagsContainer);

    document.body.appendChild(this.widgetContainer);
  }

  private createTagsContainer(): HTMLElement {
    const container = document.createElement("div");
    container.classList.add("widget__tags-container");
    return container;
  }

  private createControls(): HTMLElement {
    const controlsContainer = document.createElement("div");
    controlsContainer.classList.add("widget__controls-container");
    // controlsContainer.classList.add('controls-container');

    this.depthInput = this.createInput({
        id: "widget__depth-input",
        name: "widget__depth-input",
        className: "widget__depth-input",
    });
    this.updateButton = this.createButton({
      text: "Update",
      id: "widget__update-button",
      className: "widget__btn",
      clickHandler: this.handleUpdateClick.bind(this),
    });
    this.resetButton = this.createButton({
      text: "Reset",
      id: "widget__reset-button",
      className: "widget__btn widget__btn_v-2",
      clickHandler: this.handleResetClick.bind(this),
    });
    controlsContainer.appendChild(this.depthInput);
    controlsContainer.appendChild(this.updateButton);
    controlsContainer.appendChild(this.resetButton);

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
    input.setAttribute("placeholder", "Depth");
    input.id = id;
    if (className) input.className = className;
    return input;
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
    if (!isNaN(newDepth)) {
      this.highlightCallback(null);
      this.dispatchEvent("updateDepth", newDepth);
    }
  }

  private handleResetClick() {
    this.highlightCallback(null);
    this.depthInput.value = undefined;
    this.dispatchEvent("resetDepth");
  }

  private dispatchEvent(eventName: string, payload?: any) {
    const event = new CustomEvent(eventName, { detail: payload });
    document.dispatchEvent(event);
  }

  public addDropdown(
    title: string,
    isParent: boolean,
    element: HTMLElement
  ): HTMLElement {
    const dropdown = document.createElement("div");
    dropdown.classList.add("widget__dropdown");

    const titleElement = document.createElement("div");
    titleElement.classList.add("widget__dropdown__title");
    titleElement.textContent = title;

    // if (isParent) {
    titleElement.addEventListener("click", () =>
      this.highlightCallback(element)
    );
    titleElement.addEventListener("mouseout", () =>
      this.highlightCallback(null)
    );
    // }

    dropdown.appendChild(titleElement);
    this.tagsContainer.appendChild(dropdown);

    return dropdown;
  }

  public clearDropdowns() {
    const tagsContainer = this.tagsContainer;
    while (tagsContainer.firstChild) {
      tagsContainer.innerHTML = "";
    }
  }
}
