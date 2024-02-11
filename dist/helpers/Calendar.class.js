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
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const monthNames = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень'
];
const weekDayAbbrevs = [
    'Пн',
    'ВТ',
    'Сер',
    'Чт',
    'Пт',
    'Сб',
    'Нд',
];
var State;
(function (State) {
    State["date"] = "d";
    State["time"] = "t";
})(State || (State = {}));
var Action;
(function (Action) {
    Action["next"] = "n";
    Action["previous"] = "p";
    Action["select"] = "s";
    Action["back"] = "b";
})(Action || (Action = {}));
class Calendar {
    constructor(slots, messageText) {
        this.selectedMonth = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.maxDatesRow = 7;
        this.maxTimes = 16;
        this.maxTimesRow = 4;
        this.timePageNumber = 0;
        this.slots = slots;
        this.state = State.date;
        this.currentMonthIdx = 0;
        this.messageText = messageText;
    }
    startCalendar(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply(this.messageText, this.getKeyboard().markup);
        });
    }
    handleCalendarCb(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const cb = ctx.callbackQuery.data;
            const parts = cb.split('_');
            if (parts[0] !== 'c')
                return;
            if (parts[1] === State.date) {
                const action = parts[2];
                switch (action) {
                    case Action.next:
                        yield this.nextMonth(ctx);
                        break;
                    case Action.previous:
                        yield this.prevMonth(ctx);
                        break;
                    case Action.select:
                        yield this.selectDate(ctx, parts[3]);
                        break;
                    default:
                        throw new Error('Unknown action');
                        break;
                }
            }
            if (parts[1] === State.time) {
                const action = parts[2];
                switch (action) {
                    case Action.next:
                        yield this.nextTimePage(ctx);
                        break;
                    case Action.previous:
                        yield this.prevTimePage(ctx);
                        break;
                    case Action.select:
                        const result = yield this.selectTime(ctx, parts[3]);
                        return {
                            result
                        };
                        break;
                    case Action.back:
                        yield this.back(ctx);
                        break;
                    default:
                        throw new Error('Unknown action');
                        break;
                }
            }
        });
    }
    getKeyboard() {
        const header = this.buildSelectionHeader();
        const body = this.buildSelectionBody();
        return {
            markup: telegraf_1.Markup.inlineKeyboard([
                header,
                ...body
            ]),
            arr: [
                header,
                ...body
            ]
        };
    }
    buildSelectionHeader() {
        const header = [];
        if (this.state === State.date) {
            const isFirstMonth = this.currentMonthIdx === 0;
            const isLastMonth = this.currentMonthIdx === this.slots.length - 1;
            const monthName = monthNames[this.slots[this.currentMonthIdx].month];
            header[0] = telegraf_1.Markup.button.callback(`${isFirstMonth ? ' ' : '<<'}`, `${isFirstMonth ? ' ' : this.cb(Action.previous)}`);
            header[1] = telegraf_1.Markup.button.callback(`${monthName}`, ` `);
            header[2] = telegraf_1.Markup.button.callback(`${isLastMonth ? ' ' : '>>'}`, `${isLastMonth ? ' ' : this.cb(Action.next)}`);
        }
        else if (this.state === State.time) {
            const monthName = monthNames[this.slots[this.currentMonthIdx].month];
            header[0] = telegraf_1.Markup.button.callback(`Назад`, this.cb(Action.back));
            header[1] = telegraf_1.Markup.button.callback(`${monthName}, ${this.selectedDate}`, ` `);
            header[2] = telegraf_1.Markup.button.callback(` `, ` `);
        }
        return header;
    }
    buildSelectionBody() {
        var _a;
        const body = [];
        if (this.state === State.date) {
            const weekRow = weekDayAbbrevs.map(dayName => telegraf_1.Markup.button.callback(`${dayName}`, ' '));
            body.push(weekRow);
            const dates = this.slots[this.currentMonthIdx].dateSlots;
            const firstDate = new Date();
            firstDate.setMonth(this.slots[this.currentMonthIdx].month);
            firstDate.setDate(1);
            const firstWeekDay = (firstDate.getDay() + 6) % 7;
            const dateRowsCount = Math.ceil((dates[dates.length - 1].date + firstWeekDay) / 7);
            for (let rowIdx = 0; rowIdx < dateRowsCount; rowIdx++) {
                const row = Array.from({ length: 7 }, (_, i) => {
                    const buttonDate = (i + 1) + (7 * rowIdx) - firstWeekDay;
                    if (dates.find(el => el.date === buttonDate)) {
                        return telegraf_1.Markup.button.callback(`${buttonDate}`, this.cb(Action.select, buttonDate));
                    }
                    else {
                        return telegraf_1.Markup.button.callback(` `, ' ');
                    }
                });
                body.push(row);
            }
        }
        if (this.state === State.time) {
            const timeSlots = (_a = this.slots[this.currentMonthIdx].dateSlots.find(el => el.date === this.selectedDate)) === null || _a === void 0 ? void 0 : _a.timeSlots;
            if (!timeSlots)
                throw new Error('Timeslots were not located');
            const pageSize = (timeSlots.length > this.maxTimes) ?
                Math.min(this.maxTimes, Math.ceil(timeSlots.length / 2)) :
                timeSlots.length;
            const totalPages = Math.ceil(timeSlots.length / pageSize);
            const currentPageSlots = timeSlots.slice(this.timePageNumber * pageSize, this.timePageNumber * pageSize + pageSize);
            const rowSize = Math.min(this.maxTimesRow, Math.ceil(currentPageSlots.length / 2));
            for (let i = 0; i < currentPageSlots.length; i += rowSize) {
                const row = currentPageSlots.slice(i, i + rowSize).map(el => {
                    return telegraf_1.Markup.button.callback(`${el.time}`, this.cb(Action.select, el.time));
                });
                body.push(row);
            }
            if (totalPages > 1) {
                const isFirstPage = this.timePageNumber === 0;
                const isLastPage = this.timePageNumber + 1 === totalPages;
                body.push([
                    telegraf_1.Markup.button.callback(`${isFirstPage ? ' ' : '<<'}`, this.cb(Action.previous)),
                    telegraf_1.Markup.button.callback(`${' '}`, ' '),
                    telegraf_1.Markup.button.callback(`${isLastPage ? ' ' : '>>'}`, this.cb(Action.next))
                ]);
            }
        }
        return body;
    }
    nextMonth(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentMonthIdx += 1;
            yield this.updateKeyboard(ctx);
        });
    }
    prevMonth(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentMonthIdx -= 1;
            yield this.updateKeyboard(ctx);
        });
    }
    selectDate(ctx, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state = State.time;
            this.selectedDate = Number(value);
            this.selectedMonth = Number(this.slots[this.currentMonthIdx].month);
            yield this.updateKeyboard(ctx);
        });
    }
    ;
    back(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state = State.date;
            this.timePageNumber = 0;
            yield this.updateKeyboard(ctx);
        });
    }
    nextTimePage(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            this.timePageNumber += 1;
            yield this.updateKeyboard(ctx);
        });
    }
    prevTimePage(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            this.timePageNumber -= 1;
            yield this.updateKeyboard(ctx);
        });
    }
    selectTime(ctx, time) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedTime = time;
            const monthName = monthNames[this.slots[this.currentMonthIdx].month];
            yield ctx.editMessageText(`${this.messageText}\n*${monthName}, ${this.selectedDate} - ${this.selectedTime}*`);
            return `${monthName}, ${this.selectedDate} - ${this.selectedTime}`;
        });
    }
    cb(action, value = undefined) {
        if (!value)
            return `c_${this.state}_${action}`;
        return `c_${this.state}_${action}_${value}`;
    }
    updateKeyboard(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const newKeyboard = this.getKeyboard();
            yield ctx.editMessageReplyMarkup({ inline_keyboard: newKeyboard.arr });
        });
    }
}
exports.default = Calendar;
