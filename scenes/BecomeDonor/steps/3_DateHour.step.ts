import { Composer, Markup } from "telegraf";
import { BotContext } from "../../../context";

const DateHourStep = new Composer<BotContext>();
DateHourStep.action(/^daypicker_/, async ctx => {
    // @ts-ignore
    const selectedOption = ctx.callbackQuery.data;
    const selectedDate = new Date(selectedOption.split('_')[1]);

    ctx.session.date = selectedOption;

    await ctx.editMessageText(`Виберіть один із запропонованих днів:\n*${selectedDate.toDateString()}*`);
    
	ctx.reply('Виберіть час:');
	return ctx.wizard.next();
});

export default DateHourStep;