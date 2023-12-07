export declare const translates: {
    readonly en: {
        readonly parseButton: "Parse";
        readonly resetButton: "Reset";
        readonly instructionMessage: "Click 'Parse' for Parsing DOM Tree";
        readonly depthInputPlaceholder: "Depth(leave empty for removeing)";
    };
    readonly ua: {
        readonly parseButton: "Аналізувати";
        readonly resetButton: "Скинути";
        readonly instructionMessage: "Натисніть 'Аналізувати' для аналізу DOM-дерева";
        readonly depthInputPlaceholder: "Глибина(Залиште пустим, щоб прибрати обмеження)";
    };
};
export type TranslationKey = keyof typeof translates.en;
