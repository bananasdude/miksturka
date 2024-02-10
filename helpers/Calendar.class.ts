import { Markup } from "telegraf";
import { BotContext } from "../context";

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

type timeSlot = {
    time: string // hh:mm
}

type dateSlot = {
    date: number,
    timeSlots: timeSlot[]
}

type monthSlot = {
    month: number,
    dateSlots: dateSlot[]
}

enum State {
    date = 'd',
    time = 't'
}

enum Action {
    next = 'n',
    previous = 'p',
    select = 's',
    back = 'b'
}

export default class Calendar {
    private slots: monthSlot[];
    private state: State;
    private currentMonthIdx: number;
    private selectedMonth: number|null = null;
    private selectedDate: number|null = null;
    private selectedTime: string|null = null;
    private messageText: string;

    private maxDatesRow = 7;
    private maxTimes = 16;
    private maxTimesRow = 4;
    private timePageNumber = 0;

    constructor(slots: monthSlot[], messageText: string) {
        this.slots = slots;
        this.state = State.date;
        this.currentMonthIdx = 0;
        this.messageText = messageText;
    }

    async startCalendar(ctx: BotContext){
        await ctx.reply(this.messageText, this.getKeyboard().markup)
    }

    async handleCalendarCb(ctx: BotContext) {
        //@ts-ignore
        const cb = ctx.callbackQuery.data;
        const parts = cb.split('_');
        if (parts[0] !== 'c') return;

        if (parts[1] === State.date) {
            const action = parts[2];
            switch (action) {
                case Action.next:
                    await this.nextMonth(ctx);
                    break;
                case Action.previous:
                    await this.prevMonth(ctx);
                    break;
                case Action.select:
                    await this.selectDate(ctx, parts[3]);
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
                    await this.nextTimePage(ctx);
                    break;
                case Action.previous:
                    await this.prevTimePage(ctx);
                    break;
                case Action.select:
                    const result = await this.selectTime(ctx, parts[3]);
                    return {
                        result
                    }
                    break;
                case Action.back:
                    await this.back(ctx);
                    break;
            
                default:
                    throw new Error('Unknown action');
                    break;
            }
        }
    }

    private getKeyboard() {
        const header = this.buildSelectionHeader();
        const body = this.buildSelectionBody();

        return {
            markup: Markup.inlineKeyboard([
                header,
                ...body
            ]),
            arr: [
                header,
                ...body
            ]
        }
    }

    private buildSelectionHeader() {
        const header = [];

        if (this.state === State.date) {
            const isFirstMonth = this.currentMonthIdx === 0;
            const isLastMonth = this.currentMonthIdx === this.slots.length - 1;

            const monthName = monthNames[this.slots[this.currentMonthIdx].month];

            header[0] = Markup.button.callback(`${isFirstMonth ? ' ' : '<<'}`, `${isFirstMonth ? ' ' : this.cb(Action.previous)}`);
            header[1] = Markup.button.callback(`${monthName}`, ` `);
            header[2] = Markup.button.callback(`${isLastMonth ? ' ' : '>>'}`, `${isLastMonth ? ' ' : this.cb(Action.next)}`);
        } else if (this.state === State.time) {
            const monthName = monthNames[this.slots[this.currentMonthIdx].month];

            header[0] = Markup.button.callback(`Назад`, this.cb(Action.back));
            header[1] = Markup.button.callback(`${monthName}, ${this.selectedDate}`, ` `);
            header[2] = Markup.button.callback(` `, ` `);
        }

        return header;
    }

    private buildSelectionBody() {
        const body = [];

        if (this.state === State.date) {
            // const weekRow = weekDayAbbrevs.map(dayName => Markup.button.callback(`${dayName}`, ' '));
            // body.push(weekRow);

            const dates = this.slots[this.currentMonthIdx].dateSlots;

            // const firstDate = new Date();
            // firstDate.setMonth(this.slots[this.currentMonthIdx].month - 1);
            // firstDate.setDate(1);
            // const firstDay = (firstDate.getDay() + 6) % 7;

            // Array.from({length: 6}).forEach((_, rowIdx) => {
            //     const row = Array.from({length: 7}, (_, i) => {
            //         if (rowIdx === 0 && i < firstDay) return Markup.button.callback(` `, ' ');
                    
            //     })

            //     body.push(row);
            // })

            // const row = Array.from({length: 7}, (_, i) => {
            //     if (i < firstDay) return Markup.button.callback(` `, ' ');
                
            // })
            
            const rowSize = Math.min(this.maxDatesRow, Math.ceil(dates.length / 2));
            for (let i = 0; i < dates.length; i += rowSize) {
                const row = dates.slice(i, i + rowSize).map(el => {
                    return Markup.button.callback(`${el.date}`, this.cb(Action.select, el.date));
                });
                body.push(row);
            }
        }
        if (this.state === State.time) {
            const timeSlots = this.slots[this.currentMonthIdx].dateSlots.find(el => el.date === this.selectedDate)?.timeSlots;
            if (!timeSlots) throw new Error('Timeslots were not located');

            const pageSize = (timeSlots.length > this.maxTimes) ? 
                            Math.min(this.maxTimes, Math.ceil(timeSlots.length / 2)) :
                            timeSlots.length;
            const totalPages = Math.ceil(timeSlots.length / pageSize);

            const currentPageSlots = timeSlots.slice(this.timePageNumber * pageSize, this.timePageNumber * pageSize + pageSize)

            const rowSize = Math.min(this.maxTimesRow, Math.ceil(currentPageSlots.length / 2));
            for (let i = 0; i < currentPageSlots.length; i += rowSize) {
                const row = currentPageSlots.slice(i, i + rowSize).map(el => {
                    return Markup.button.callback(`${el.time}`, this.cb(Action.select, el.time));
                });
                body.push(row);
            }

            if (totalPages > 1) {
                const isFirstPage = this.timePageNumber === 0;
                const isLastPage = this.timePageNumber + 1 === totalPages;

                body.push([
                    Markup.button.callback(`${isFirstPage ? ' ' : '<<'}`, this.cb(Action.previous)),
                    Markup.button.callback(`${' '}`, ' '),
                    Markup.button.callback(`${isLastPage ? ' ' : '>>'}`, this.cb(Action.next))
                ]);
            }
        }

        return body;
    }

    private async nextMonth(ctx: BotContext) {
        this.currentMonthIdx += 1;
        await this.updateKeyboard(ctx);
    }

    private async prevMonth(ctx: BotContext) {
        this.currentMonthIdx -= 1;
        await this.updateKeyboard(ctx);
    }

    private async selectDate(ctx: BotContext, value: string) {
        this.state = State.time;
        this.selectedDate = Number(value);
        this.selectedMonth = Number(this.slots[this.currentMonthIdx].month);

        await this.updateKeyboard(ctx);
    };

    private async back(ctx: BotContext) {
        this.state = State.date;
        this.timePageNumber = 0;
        await this.updateKeyboard(ctx);
    }

    private async nextTimePage(ctx: BotContext) {
        this.timePageNumber += 1;
        await this.updateKeyboard(ctx);
    }

    private async prevTimePage(ctx: BotContext) {
        this.timePageNumber -= 1;
        await this.updateKeyboard(ctx);
    }

    private async selectTime(ctx: BotContext, time: string) {
        this.selectedTime = time;

        const monthName = monthNames[this.slots[this.currentMonthIdx].month];
        await ctx.editMessageText(`${this.messageText}\n*${monthName}, ${this.selectedDate} - ${this.selectedTime}*`);

        return `${monthName}, ${this.selectedDate} - ${this.selectedTime}`;
    }

    private cb(action: Action, value: number|string|undefined = undefined) {
        if (!value) return `c_${this.state}_${action}`;
        return `c_${this.state}_${action}_${value}`;
    }
    
    private async updateKeyboard(ctx: BotContext) {
        const newKeyboard = this.getKeyboard();
        await ctx.editMessageReplyMarkup({inline_keyboard: newKeyboard.arr});
    }
}