import { Markup, Scenes } from "telegraf";
import { BotContext } from "../../context";
import CONSTANTS from '../../constants';
const { enter, leave } = Scenes.Stage;

const MainMenu = new Scenes.BaseScene<BotContext>('main-menu');

MainMenu.enter(async ctx => {
    const msg = ctx.session.isFirstRun ? CONSTANTS.MAIN_MENU.WELCOME_MESSAGE_FIRST_RUN : CONSTANTS.MAIN_MENU.WELCOME_MESSAGE_NEXT_RUN;
    ctx.session.isFirstRun = false;
    await ctx.reply(msg, Markup.inlineKeyboard([
        [Markup.button.callback('Дізнатися більше', 'menu_action_learn_more')],
        [Markup.button.callback('Стати донором', 'menu_action_become_donor')],
        [Markup.button.callback('Переглянути запис', 'menu_action_review_appt')],
        [Markup.button.callback('Відмінити візит', 'menu_action_cancel_appt')]
    ]))
});

MainMenu.action('menu_action_learn_more', async ctx => {
    const msg = ctx.session.isFirstRun ? CONSTANTS.MAIN_MENU.WELCOME_MESSAGE_FIRST_RUN : CONSTANTS.MAIN_MENU.WELCOME_MESSAGE_NEXT_RUN;
    await ctx.editMessageText(msg + '\n\n*Дізнатися більше*');

    await ctx.reply(`Донорами крові в Україні можуть бути здорові люди віком від 18 років і вагою від 50 кг. Щоб записатися обери "Стати донором"`);
    ctx.scene.reenter();
});
MainMenu.action('menu_action_become_donor', async ctx => {
    const msg = ctx.session.isFirstRun ? CONSTANTS.MAIN_MENU.WELCOME_MESSAGE_FIRST_RUN : CONSTANTS.MAIN_MENU.WELCOME_MESSAGE_NEXT_RUN;
    ctx.editMessageText(msg + '\n\n*Стати донором*');

    await ctx.scene.enter('become-donor')
});
MainMenu.action('menu_action_review_appt', async ctx => {
    const msg = ctx.session.isFirstRun ? CONSTANTS.MAIN_MENU.WELCOME_MESSAGE_FIRST_RUN : CONSTANTS.MAIN_MENU.WELCOME_MESSAGE_NEXT_RUN;
    await ctx.editMessageText(msg + '\n\n*Переглянути запис*');

    await ctx.reply(`У тебе немає активних записів. Щоб записатися обери "Стати донором"`);

    ctx.scene.reenter();
});
MainMenu.action('menu_action_cancel_appt', async ctx => {
    const msg = ctx.session.isFirstRun ? CONSTANTS.MAIN_MENU.WELCOME_MESSAGE_FIRST_RUN : CONSTANTS.MAIN_MENU.WELCOME_MESSAGE_NEXT_RUN;
    ctx.editMessageText(msg + '\n\n*Відмінити візит*');
    
    await ctx.reply(`У тебе немає активних записів. Щоб записатися обери "Стати донором"`);

    ctx.scene.reenter();
});

export default MainMenu;