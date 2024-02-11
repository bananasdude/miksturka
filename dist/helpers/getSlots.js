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
Object.defineProperty(exports, "__esModule", { value: true });
const getAvailableSlots = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    const monthNums = [3, 4, 5, 6];
    const daysInMonth = [1, 3, 5];
    for (let m = 0; m < monthNums.length; m++) {
        const dt = new Date();
        dt.setMonth(monthNums[m]);
        const dateSlots = [];
        for (let d = 1; d < 30; d++) {
            dt.setDate(d);
            if (daysInMonth.includes(dt.getDay())) {
                const timeSlots = [
                    {
                        time: '09:00'
                    },
                    {
                        time: '12:00'
                    },
                    {
                        time: '15:00'
                    },
                    {
                        time: '18:00'
                    }
                ];
                dateSlots.push({
                    date: dt.getDate(),
                    timeSlots
                });
            }
        }
        result.push({
            month: monthNums[m],
            dateSlots
        });
    }
    return result;
});
exports.default = getAvailableSlots;
