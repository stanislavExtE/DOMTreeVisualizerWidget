export const checkValidLocale = (localesList: string[], locale: string): string | null => {
    return localesList.includes(locale) ? locale : null;
}
