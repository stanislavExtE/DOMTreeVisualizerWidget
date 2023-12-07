
export const translates = {
    en: {
      "parseButton": "Parse",
      "resetButton": "Reset",
      "instructionMessage": "Click 'Parse' for Parsing DOM Tree",
      "depthInputPlaceholder": "Depth(leave empty for removeing)",
    },
    ua: {
      "parseButton": "Аналізувати",
      "resetButton": "Скинути",
      "instructionMessage": "Натисніть 'Аналізувати' для аналізу DOM-дерева",
      "depthInputPlaceholder": "Глибина(Залиште пустим, щоб прибрати обмеження)",
    }
  } as const;

  export type TranslationKey = keyof typeof translates.en;