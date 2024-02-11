import { Markup, Scenes } from "telegraf";
import { BotContext } from "../../../context";
import CONSTANTS from '../../../constants';
import Calendar from "../../../helpers/Calendar.class";
import getAvailableSlots from "../../../helpers/getSlots";

const CalendarStep = new Scenes.BaseScene<BotContext>('calendar-step');
let calendar: Calendar;

CalendarStep.enter(async ctx => {
    calendar = new Calendar(await getAvailableSlots(), CONSTANTS.BECOME_DONOR.CALENDAR_PROMPT);
    await calendar.startCalendar(ctx);
});

CalendarStep.on('callback_query', async ctx => {
    if (calendar) {
        const result = await calendar.handleCalendarCb(ctx);

        if (result?.result) {
            await ctx.scene.enter('reminder-step');
        }
    }
});

CalendarStep.on('message', ctx => {});

export default CalendarStep;