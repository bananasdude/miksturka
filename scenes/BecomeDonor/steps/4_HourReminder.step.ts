import { Composer, Markup } from "telegraf";
import { BotContext } from "../../../context";


const HourReminderStep = new Composer<BotContext>();
HourReminderStep.action(/^timepicker_/, async ctx => {
    // @ts-ignore
    const selectedOption = ctx.callbackQuery.data;
    const selectedDate = new Date(Number(selectedOption.split('_')[1]));

    ctx.session.time = `${selectedDate.getHours()}:${selectedDate.getMinutes()}`;

    await ctx.editMessageText(`Виберіть час:\n*${selectedDate.getHours()}:${selectedDate.getMinutes()}*`);
    
	ctx.reply('Чи хочеш аби тобі прийшло нагадування за годину до візиту?', Markup.inlineKeyboard([
        Markup.button.callback(`Так`, `reminder_yes`),
        Markup.button.callback(`Ні`, `reminder_no`)
    ]));
	return ctx.wizard.next();
});

export default HourReminderStep;