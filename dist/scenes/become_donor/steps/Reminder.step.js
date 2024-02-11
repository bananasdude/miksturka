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
const constants_1 = __importDefault(require("../../../constants"));
const { enter, leave } = telegraf_1.Scenes.Stage;
const ReminderStep = new telegraf_1.Scenes.BaseScene('reminder-step');
ReminderStep.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(constants_1.default.BECOME_DONOR.REMINDER_QUESTION, telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Так', 'reminder_yes'),
        telegraf_1.Markup.button.callback('Ні', 'reminder_no')
    ]));
}));
ReminderStep.on('callback_query', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const cb = ctx.callbackQuery.data;
    if (!['reminder_yes', 'reminder_no'].includes(cb))
        return;
    yield ctx.editMessageText(constants_1.default.BECOME_DONOR.REMINDER_QUESTION + `/n/n${cb === 'reminder_yes' ? 'Так' : 'Ні'}`);
    yield ctx.reply(constants_1.default.BECOME_DONOR.DONE_MESSAGE);
    yield ctx.scene.enter('main-menu');
}));
ReminderStep.on('message', ctx => { });
exports.default = ReminderStep;
