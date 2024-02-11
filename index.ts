import 'dotenv/config';

import { Markup, Scenes, Telegraf, session } from "telegraf";
import { BotContext } from "./context";
import CONSTANTS from './constants';

import MainMenu from './scenes/main_menu/MainMenu.scene';
import BecomeDonorScene from './scenes/become_donor/BecomeDonor.scene';
import CalendarStep from './scenes/become_donor/steps/Calendar.step';
import GetNameStep from './scenes/become_donor/steps/Name.step';
import ReminderStep from './scenes/become_donor/steps/Reminder.step';

const stage = new Scenes.Stage<BotContext>([
    MainMenu,
    BecomeDonorScene,
    GetNameStep,
    CalendarStep,
    ReminderStep
]);

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN as string);
bot.use(session());
bot.use(stage.middleware());

bot.start(async ctx => {
    await ctx.reply(CONSTANTS.MAIN_MENU.INTRO_MESSAGE);
    await ctx.scene.enter('main-menu');
});
bot.command('menu', async ctx => {
    await ctx.scene.enter('main-menu');
});

bot.on('message', ctx => {});

// bot.launch();
bot
.launch({ webhook: { domain: process.env.WH_DOMAIN as string, port: 8081 } })
.then(() => console.log("Webhook bot listening on port", 8081));