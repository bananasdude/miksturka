import { Markup, Scenes } from "telegraf";
import { BotContext } from "../../../context";
import CONSTANTS from '../../../constants';
const { enter, leave } = Scenes.Stage;

const ReminderStep = new Scenes.BaseScene<BotContext>('reminder-step');

ReminderStep.enter(async ctx => {
    await ctx.reply(CONSTANTS.BECOME_DONOR.REMINDER_QUESTION, Markup.inlineKeyboard([
        Markup.button.callback('Так', 'reminder_yes'),
        Markup.button.callback('Ні', 'reminder_no')
    ]))
});

ReminderStep.on('callback_query', async ctx => {
    //@ts-ignore
    const cb = ctx.callbackQuery.data;

    if (!['reminder_yes', 'reminder_no'].includes(cb)) return;

    await ctx.editMessageText(CONSTANTS.BECOME_DONOR.REMINDER_QUESTION + `/n/n${cb === 'reminder_yes'? 'Так':'Ні'}`);

    await ctx.reply(CONSTANTS.BECOME_DONOR.DONE_MESSAGE);

    await ctx.scene.enter('main-menu');
});

ReminderStep.on('message', ctx => {});

export default ReminderStep;