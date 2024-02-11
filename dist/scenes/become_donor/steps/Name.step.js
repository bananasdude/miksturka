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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const constants_1 = __importDefault(require("../../../constants"));
const GetNameStep = new telegraf_1.Scenes.BaseScene('get-name-step');
GetNameStep.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(constants_1.default.BECOME_DONOR.NEXT_STEPS);
    yield ctx.reply(constants_1.default.BECOME_DONOR.ASK_NAME);
}));
GetNameStep.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const response = ctx.message.text;
    if (response.length < 3 || response.length > 15) {
        yield ctx.reply(constants_1.default.BECOME_DONOR.INVALID_NAME);
        return;
    }
    ctx.scene.enter('calendar-step');
}));
GetNameStep.on('message', ctx => { });
exports.default = GetNameStep;
