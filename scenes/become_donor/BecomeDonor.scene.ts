import { Markup, Scenes } from "telegraf";
import { BotContext } from "../../context";
const { enter, leave } = Scenes.Stage;

const BecomeDonorScene = new Scenes.BaseScene<BotContext>('become-donor');

BecomeDonorScene.enter(async (ctx, next) => {
    await ctx.scene.enter('get-name-step');
});

BecomeDonorScene.on('message', ctx => {});


export default BecomeDonorScene;