"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const constants_1 = __importDefault(require("../../constants"));
const { enter, leave } = telegraf_1.Scenes.Stage;
const MainMenu = new telegraf_1.Scenes.BaseScene('main-menu');
MainMenu.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = ctx.session.isFirstRun ? constants_1.default.MAIN_MENU.WELCOME_MESSAGE_FIRST_RUN : constants_1.default.MAIN_MENU.WELCOME_MESSAGE_NEXT_RUN;
    ctx.session.isFirstRun = false;
    yield ctx.reply(msg, telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback('Дізнатися більше', 'menu_action_learn_more')],
        [telegraf_1.Markup.button.callback('Стати донором', 'menu_action_become_donor')],
        [telegraf_1.Markup.button.callback('Переглянути запис', 'menu_action_review_appt')],
        [telegraf_1.Markup.button.callback('Відмінити візит', 'menu_action_cancel_appt')]
    ]));
}));
MainMenu.action('menu_action_learn_more', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = ctx.session.isFirstRun ? constants_1.default.MAIN_MENU.WELCOME_MESSAGE_FIRST_RUN : constants_1.default.MAIN_MENU.WELCOME_MESSAGE_NEXT_RUN;
    yield ctx.editMessageText(msg + '\n\n*Дізнатися більше*');
    yield ctx.reply(`Донорами крові в Україні можуть бути здорові люди віком від 18 років і вагою від 50 кг. Щоб записатися обери "Стати донором"`);
    ctx.scene.reenter();
}));
MainMenu.action('menu_action_become_donor', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = ctx.session.isFirstRun ? constants_1.default.MAIN_MENU.WELCOME_MESSAGE_FIRST_RUN : constants_1.default.MAIN_MENU.WELCOME_MESSAGE_NEXT_RUN;
    ctx.editMessageText(msg + '\n\n*Стати донором*');
    yield ctx.scene.enter('become-donor');
}));
MainMenu.action('menu_action_review_appt', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = ctx.session.isFirstRun ? constants_1.default.MAIN_MENU.WELCOME_MESSAGE_FIRST_RUN : constants_1.default.MAIN_MENU.WELCOME_MESSAGE_NEXT_RUN;
    yield ctx.editMessageText(msg + '\n\n*Переглянути запис*');
    yield ctx.reply(`У тебе немає активних записів. Щоб записатися обери "Стати донором"`);
    ctx.scene.reenter();
}));
MainMenu.action('menu_action_cancel_appt', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = ctx.session.isFirstRun ? constants_1.default.MAIN_MENU.WELCOME_MESSAGE_FIRST_RUN : constants_1.default.MAIN_MENU.WELCOME_MESSAGE_NEXT_RUN;
    ctx.editMessageText(msg + '\n\n*Відмінити візит*');
    yield ctx.reply(`У тебе немає активних записів. Щоб записатися обери "Стати донором"`);
    ctx.scene.reenter();
}));
exports.default = MainMenu;
