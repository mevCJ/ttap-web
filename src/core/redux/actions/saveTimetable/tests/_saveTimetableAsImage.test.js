"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const saveTimetableAsImage_1 = require("../saveTimetableAsImage");
describe("SaveTimetableAsImage action", () => {
    it("'s typename should be 'save timetable as - image'", () => {
        const action = new saveTimetableAsImage_1.SaveTimetableAsImage();
        chai_1.expect(action.TypeName()).to.eq("save timetable as - image");
    });
});
//# sourceMappingURL=_saveTimetableAsImage.test.js.map