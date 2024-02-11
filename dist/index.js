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
require("dotenv/config");
const telegraf_1 = require("telegraf");
const constants_1 = __importDefault(require("./constants"));
const MainMenu_scene_1 = __importDefault(require("./scenes/main_menu/MainMenu.scene"));
const BecomeDonor_scene_1 = __importDefault(require("./scenes/become_donor/BecomeDonor.scene"));
const Calendar_step_1 = __importDefault(require("./scenes/become_donor/steps/Calendar.step"));
const Name_step_1 = __importDefault(require("./scenes/become_donor/steps/Name.step"));
const Reminder_step_1 = __importDefault(require("./scenes/become_donor/steps/Reminder.step"));
const stage = new telegraf_1.Scenes.Stage([
    MainMenu_scene_1.default,
    BecomeDonor_scene_1.default,
    Name_step_1.default,
    Calendar_step_1.default,
    Reminder_step_1.default
]);
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.use((0, telegraf_1.session)());
bot.use(stage.middleware());
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(constants_1.default.MAIN_MENU.INTRO_MESSAGE);
    yield ctx.scene.enter('main-menu');
}));
bot.command('menu', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.scene.enter('main-menu');
}));
bot.on('message', ctx => { });
// bot.launch();
bot
    .launch({ webhook: { domain: process.env.WH_DOMAIN, port: 8081 } })
    .then(() => console.log("Webhook bot listening on port", 8081));
