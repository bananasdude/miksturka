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
const Calendar_class_1 = __importDefault(require("../../../helpers/Calendar.class"));
const getSlots_1 = __importDefault(require("../../../helpers/getSlots"));
const CalendarStep = new telegraf_1.Scenes.BaseScene('calendar-step');
let calendar;
CalendarStep.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    calendar = new Calendar_class_1.default(yield (0, getSlots_1.default)(), constants_1.default.BECOME_DONOR.CALENDAR_PROMPT);
    yield calendar.startCalendar(ctx);
}));
CalendarStep.on('callback_query', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (calendar) {
        const result = yield calendar.handleCalendarCb(ctx);
        if (result === null || result === void 0 ? void 0 : result.result) {
            yield ctx.scene.enter('reminder-step');
        }
    }
}));
CalendarStep.on('message', ctx => { });
exports.default = CalendarStep;
