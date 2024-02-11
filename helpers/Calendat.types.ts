type timeSlot = {
    time: string // hh:mm
}

type dateSlot = {
    date: number,
    timeSlots: timeSlot[]
}

type monthSlot = {
    month: number,
    dateSlots: dateSlot[]
}

export {
    timeSlot,
    dateSlot,
    monthSlot
}