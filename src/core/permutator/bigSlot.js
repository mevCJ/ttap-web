"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../att/type");
const getInitial_1 = require("../util/getInitial");
/**
 * BigSlot's difference with TinySlot is that BigSlot will include week number,
 * Thus, if user want to search timetables by considering week number, BigSlot should be used instead of TinySlot
 * @export
 * @class BigSlot
 * @implements {IOptimizedSlot}
 */
class BigSlot {
    constructor(s) {
        this.PartitionKey = s.SubjectCode * 10 + type_1.ParseType(s.Type);
        this.SlotNumber = s.SlotNumber;
        this.Uid = s.SlotNumber;
        this.SlotIds = [];
        this.SlotIds.push(s.Uid);
        this.DayTimeMatrix = GetDayTimeMatrixOfBigSlot(s.Day, s.Week, s.TimePeriod);
        this.PartitionGroup = `${getInitial_1.GetInitial(s.SubjectName)}(${s.Type})`;
    }
}
exports.BigSlot = BigSlot;
function GetDayTimeMatrixOfBigSlot(Day, Week, TimePeriod) {
    let result = [];
    const weekBinary = Week.toString(2);
    const matrix = [0, 0, 0, 0, 0, 0, 0];
    matrix[Day - 1] = TimePeriod;
    const maxNumberOfWeek = 14;
    for (let i = weekBinary.length - 1; i >= 0; i--) {
        if (weekBinary[i] === "1") {
            result = result.concat(matrix.slice());
        }
        else {
            result = result.concat([0, 0, 0, 0, 0, 0, 0]);
        }
    }
    for (let i = result.length / 7; i < maxNumberOfWeek; i++) {
        result = result.concat([0, 0, 0, 0, 0, 0, 0]);
    }
    return result;
}
exports.GetDayTimeMatrixOfBigSlot = GetDayTimeMatrixOfBigSlot;
//# sourceMappingURL=bigSlot.js.map