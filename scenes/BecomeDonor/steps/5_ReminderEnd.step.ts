import { Composer, Markup } from "telegraf";
import { BotContext } from "../../../context";

const ReminderEndStep = new Composer<BotContext>();
ReminderEndStep.action('reminder_yes', async ctx => {
    // @ts-ignore
    const selectedOption = ctx.callbackQuery.data;
    const selectedDate = selectedOption.split('_')[1];

    await ctx.editMessageText(`Чи хочеш аби тобі прийшло нагадування за годину до візиту?\n*Так*`);
    
	ctx.reply(`Перші етапи виконані: твій запис збережено! Залишився останній крок - чекаємо на тебе ${ctx.session.date} о ${ctx.session.time} в лікарні!`);
	return ctx.wizard.next();
});

ReminderEndStep.action('reminder_no', async ctx => {
    // @ts-ignore
    const selectedOption = ctx.callbackQuery.data;
    const selectedDate = selectedOption.split('_')[1];

    await ctx.editMessageText(`Чи хочеш аби тобі прийшло нагадування за годину до візиту?\n*Ні*`);
    
	ctx.reply(`Перші етапи виконані: твій запис збережено! Залишився останній крок - чекаємо на тебе ${ctx.session.date} о ${ctx.session.time} в лікарні!`);
	return ctx.wizard.next();
});

export default ReminderEndStep;