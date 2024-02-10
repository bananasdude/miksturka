require('dotenv').config();

import { Markup, Scenes, Telegraf, session } from "telegraf";
// const LocalSession = require('telegraf-session-local')
import BecomeDonorWizard from "./scenes/BecomeDonor/BecomeDonor.scene";
import { BotContext } from "./context";
import CONSTANTS from './constants';
import Calendar from "./helpers/Calendar.class";

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN as string);

const stage = new Scenes.Stage<BotContext>([BecomeDonorWizard]);
// bot.use((new LocalSession({ database: 'sessions.json' })).middleware());
bot.use(session())
bot.use(stage.middleware());

bot.action('menu_action_learn_more', async ctx => {
    ctx.editMessageText(CONSTANTS.WELCOME_MESSAGE_FIRST_RUN + '\n\n*Дізнатися більше*');
    ctx.scene.enter("become-donor-wizard");
});
bot.action('menu_action_become_donor', async ctx => {
    ctx.editMessageText(CONSTANTS.WELCOME_MESSAGE_FIRST_RUN + '\n\n*Стати донором*');
    ctx.scene.enter("become-donor-wizard");
});
bot.action('menu_action_review_appt', async ctx => {
    ctx.editMessageText(CONSTANTS.WELCOME_MESSAGE_FIRST_RUN + '\n\n*Переглянути запис*');
    ctx.scene.enter("become-donor-wizard");
});
bot.action('menu_action_cancel_appt', async ctx => {
    ctx.editMessageText(CONSTANTS.WELCOME_MESSAGE_FIRST_RUN + '\n\n*Відмінити візит*');
    ctx.scene.enter("become-donor-wizard");
});

// bot.start(async ctx => {
//     await ctx.reply('Вітаю! Я Мікстурка, твій бот-помічник 🤖. Сьогодні я готовий тобі допомогти в здійсненні доброї справи - стати донором крові 🩸');
//     await ctx.reply(CONSTANTS.WELCOME_MESSAGE_FIRST_RUN, Markup.inlineKeyboard([
//         [Markup.button.callback('Дізнатися більше', 'menu_action_learn_more')],
//         [Markup.button.callback('Стати донором', 'menu_action_become_donor')],
//         [Markup.button.callback('Переглянути запис', 'menu_action_review_appt')],
//         [Markup.button.callback('Відмінити візит', 'menu_action_cancel_appt')]
//     ]))
// });

const slots = [
    {
        month: 1,
        dateSlots: [
            {
                date: 1,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 2,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 3,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 4,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 5,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 6,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 7,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 8,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 9,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            }
        ]
    },
    {
        month: 2,
        dateSlots: [
            {
                date: 1,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 2,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    },
                    {
                        time: '10:25'
                    },
                    {
                        time: '10:30'
                    },
                    {
                        time: '10:35'
                    },
                    {
                        time: '10:40'
                    },
                    {
                        time: '10:45'
                    },
                    {
                        time: '10:50'
                    },
                    {
                        time: '10:55'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    },
                    {
                        time: '11:00'
                    }
                ]
            },
            {
                date: 3,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 4,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 5,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 6,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 7,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            },
            {
                date: 8,
                timeSlots: [
                    {
                        time: '10:00'
                    },
                    {
                        time: '10:05'
                    },
                    {
                        time: '10:10'
                    },
                    {
                        time: '10:15'
                    },
                    {
                        time: '10:20'
                    }
                ]
            }
        ]
    }
]
let calendar: Calendar;

bot.on('callback_query', async ctx => {
    if (calendar) {
        const result = await calendar.handleCalendarCb(ctx);

        if (result?.result) console.log(result.result);
    }
})
bot.start(async ctx => {
    calendar = new Calendar(slots, 'Оберіть дату та час:');
    await calendar.startCalendar(ctx);
});

bot.launch();
