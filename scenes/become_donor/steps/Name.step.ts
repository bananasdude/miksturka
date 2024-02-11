import { Markup, Scenes } from "telegraf";
import { BotContext } from "../../../context";
import CONSTANTS from '../../../constants';

const GetNameStep = new Scenes.BaseScene<BotContext>('get-name-step');

GetNameStep.enter(async ctx => {
    await ctx.reply(CONSTANTS.BECOME_DONOR.NEXT_STEPS);
    await ctx.reply(CONSTANTS.BECOME_DONOR.ASK_NAME);
});

GetNameStep.on('text', async ctx => {
    const response = ctx.message.text;

    if (response.length < 3 || response.length > 15) {
        await ctx.reply(CONSTANTS.BECOME_DONOR.INVALID_NAME);
        return;
    }

    ctx.scene.enter('calendar-step');
});

GetNameStep.on('message', ctx => {});

export default GetNameStep;