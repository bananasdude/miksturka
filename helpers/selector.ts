import { Markup } from "telegraf";

type slot = {
    label:string;
    cbValue:string;
}

const buildSelector = (slots:slot[]) => {
    const buttons = slots.map(slot => {
        return Markup.button.callback(`${slot.label}`, `${slot.cbValue}`);
    });

    const rowSize = 4;
    const buttonGroups = [];
    for (let i = 0; i < buttons.length; i += rowSize) {
        const chunk = buttons.slice(i, i + rowSize);
        buttonGroups.push(chunk);
    }

    return Markup.inlineKeyboard(buttonGroups);
}

const createCb = (values: Date): slot[] => {
    return []
}