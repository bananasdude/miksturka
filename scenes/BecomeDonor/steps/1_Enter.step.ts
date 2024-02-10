import { BotContext } from "../../../context";

export default async (ctx: BotContext) => {
    await ctx.reply('Щоб стати донором, тобі лише треба виконати три простих кроки:\n1️⃣ Вказати своє ім`я;\n2️⃣ Обрати зручний для тебе час з запропонованих годин візиту;\n3️⃣ З`явитися у лікарні та вчинити добру справу.\nПоїхали!');
    await ctx.reply("Вкажіть своє прізвище та ініціали:");
    return ctx.wizard.next();
}