"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const saveTimetableAsTextFile_1 = require("../saveTimetableAsTextFile");
describe("SaveTimetableAsTextFile action", () => {
    it("'s typename should be 'save timetable as - text file'", () => {
        const action = new saveTimetableAsTextFile_1.SaveTimetableAsTextFile();
        chai_1.expect(action.TypeName()).to.eq("save timetable as - text file");
    });
});
//# sourceMappingURL=_saveTimetableAsTextFile.test.js.map