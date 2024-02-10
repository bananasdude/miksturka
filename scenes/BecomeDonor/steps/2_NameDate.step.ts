import { Composer, Markup } from "telegraf";
import { BotContext } from "../../../context";


const NameTimeStep = new Composer<BotContext>();
NameTimeStep.on('text', async ctx => {
    const response = ctx.message.text;
    if (!response || response.length < 5) {
        return await ctx.reply('Введіть коректне ім`я');
    }

    ctx.session.name = response;


	ctx.reply('Виберіть один із запропонованих днів:');
	return ctx.wizard.next();
});

export default NameTimeStep;