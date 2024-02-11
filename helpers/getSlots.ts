import { monthSlot } from "./Calendat.types";

const getAvailableSlots = async (): Promise<monthSlot[]> => {
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
                ]
                dateSlots.push({
                    date: dt.getDate(),
                    timeSlots
                })
            }
        }

        result.push({
            month: monthNums[m],
            dateSlots
        })
    }
    return result;
}

export default getAvailableSlots;