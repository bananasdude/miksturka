import { Composer, Markup, Scenes } from "telegraf";
import { BotContext } from '../../context';

import EnterStep from "./steps/1_Enter.step";
import NameTimeStep from "./steps/2_NameDate.step";
import DateHourStep from "./steps/3_DateHour.step";
import HourReminderStep from "./steps/4_HourReminder.step";
import ReminderEndStep from "./steps/5_ReminderEnd.step";


const BecomeDonorWizard = new Scenes.WizardScene<BotContext>(
	"become-donor-wizard",
	EnterStep,
	NameTimeStep,
	DateHourStep,
	HourReminderStep,
	ReminderEndStep,
	async ctx => {
		return await ctx.scene.leave();
	}
);


export default BecomeDonorWizard;