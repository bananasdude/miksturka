import { Context, Scenes } from 'telegraf';
import Calendar from './helpers/Calendar.class';

interface Appointment {
    name: string|null,
    dateTime: string|null,
    sendReminder: boolean
}

interface SessionContext extends Scenes.SceneSession {
	appointment: Appointment,
    isFirstRun: boolean,
    calendar: Calendar
}

interface BotContext extends Context {
    session: SessionContext;
	scene: Scenes.SceneContextScene<BotContext>;
}

export {
    BotContext
};