"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_saver_1 = require("file-saver");
const slotViewModel_1 = require("../../../model/slotViewModel");
const timetableSummary_1 = require("./../../../model/timetableSummary");
const saveTimetable_1 = require("./saveTimetable");
class SaveTimetableAsTextFile extends saveTimetable_1.SaveTimetable {
    Save(timetable, rawSlotStore) {
        const rawSlots = rawSlotStore.GetBunch(timetable.SlotUids);
        const data = "NOTE:\r\n"
            + "\tThe subjects below are ordered by their slots scarcity (a.k.a rareness).\r\n"
            + "\tSo, you should bid the TOPMOST subject first.\r\n\r\n"
            + new timetableSummary_1.TimetableSummary(slotViewModel_1.CreateSlotViewModels(rawSlots))
                .SortByScarcity(rawSlotStore.GetAll())
                .ToString();
        const file = new File([data], "MyTimetable.txt", {
            type: "text/plain;charset=utf-8"
        });
        file_saver_1.saveAs(file);
    }
    SaveType() {
        return "text file";
    }
}
exports.SaveTimetableAsTextFile = SaveTimetableAsTextFile;
//# sourceMappingURL=saveTimetableAsTextFile.js.map