"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timetable {
    constructor(Uids, dayTimeMatrix) {
        this.SlotUids = Uids;
        this.DayTimeMatrix = CompressDayTimeMatrix(dayTimeMatrix);
    }
}
exports.Timetable = Timetable;
function CompressDayTimeMatrix(dayTimeMatrix) {
    const result = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < dayTimeMatrix.length; i++) {
        result[i % 7] |= dayTimeMatrix[i]; // 7 means the numberOfDayPerWeek
    }
    return result;
}
exports.CompressDayTimeMatrix = CompressDayTimeMatrix;
//# sourceMappingURL=timetable.js.map