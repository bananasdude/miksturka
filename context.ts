import { Context, Scenes } from 'telegraf';

interface SessionContext extends Scenes.WizardSession {
	name: string;
    date: string;
    time: string;
    reminder: Date | undefined
}

interface BotContext extends Context {
    session: SessionContext;
	scene: Scenes.SceneContextScene<BotContext, Scenes.WizardSessionData>;
	wizard: Scenes.WizardContextWizard<BotContext>;
}

export {
    BotContext
};