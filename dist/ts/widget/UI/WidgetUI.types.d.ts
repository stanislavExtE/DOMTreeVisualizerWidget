import { TranslationKey } from "../../../lang/translates";
export type LangOptions = {
    locale?: string;
    translates?: Partial<Record<TranslationKey, string>>;
};
export type WidgetUIOptions = {
    openTreeByDefault?: boolean;
    shownWidgetByDefault?: boolean;
    lang?: LangOptions;
};
export type WidgetUIProps = {
    highlightCallback: (element: HTMLElement) => void;
};
