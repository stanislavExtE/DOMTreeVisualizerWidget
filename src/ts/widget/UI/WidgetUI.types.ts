export type WidgetUIOptions = {
    openTreeByDefault?: boolean;
    shownWidgetByDefault?: boolean; 
}

export type WidgetUIProps = {
    highlightCallback: (element: HTMLElement) => void;
}