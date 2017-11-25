import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import { FindClashes } from "../../clashFinder/findClashes";
import { GetInitial } from "../../helper";
import {
    CodeOf, GetTestSubjects1
} from "../../tests/testDataGenerator";
import {
    ToggleSubjectListViewingOptions
} from "./../actions/toggleSubjectListViewingOption";
import {
    CheckForClashesBetween,
    FindTimetableBasedOn,
    ToggleSubjectSelection
} from "./../actions/toggleSubjectSelection";
import {
    ISubjectListState,
    SubjectListState,
    SubjectListStateReducer
} from "./../reducers/subjectListState";

const mockSubjects = GetTestSubjects1();
FindClashes(mockSubjects); // some test will fail if this line is not run

describe("toggle subject selection action", () => {

    it("'s type name should be 'select subject'", () => {
        const action = new ToggleSubjectSelection("");
        expect(action.TypeName())
            .to
            .eq("toggle subject selection");

    });

    it("should toggle selection on a subject based on its subject code", () => {
        const initialState = new SubjectListState(mockSubjects);
        const newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.HE).Action());
        expect(newState.Subjects.filter((s) => s.Code === CodeOf.HE)[0].IsSelected)
            .to
            .eq(true);
    });

    it("should toggle selection on subject from true to false also", () => {
        const initialState = new SubjectListState(mockSubjects);
        let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.HE).Action());
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.HE).Action());
        expect(newState.Subjects.filter((s) => s.Code === CodeOf.HE)[0].IsSelected)
            .to
            .eq(false);
    });

    it("should show all subjects when user deselected all subjects", () => {
        const initialState = new SubjectListState(mockSubjects);
        let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.HE).Action());
        newState = SubjectListStateReducer(newState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.IsShowingSelectedSubjectOnly).to.eq(true);
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.HE).Action());
        expect(newState.IsShowingSelectedSubjectOnly).to.eq(false);
        expect(newState.Subjects.every((x) => x.IsVisible)).to.eq(true);
    });

    it("should set the property of timetable when selecting subject", () => {
        const initialState = new SubjectListState(mockSubjects);
        const newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.HE).Action());
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);

    });

    describe("behaviour of subject selection", () => {
        it("case 1", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU32013' [BKA]
            Then Ali shall see a clash report saying 'MPU32013' cannot be selected
            And the clash report should be Single-Clashing error, not Group-Clashing error
        `;
            const initialState = new SubjectListState(mockSubjects);
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.ACP).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BKA).Action());
            const clashReport = newState.Subjects.filter((x) => x.Code === CodeOf.BKA)[0].ClashReport;
            expect(clashReport.Type).to.eq("single");
            expect(clashReport.TargetName).to.eq("Arts & Cultural Performance");
        });

        it("case 2", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU3143' [BMK2]
            And Then Ali selected subject 'UKMM1043' [BEAM]
            Then Ali shall see a clash report on [BEAM] saying that
                it cannot be selected due to Group Clashing
        `;
            const initialState = new SubjectListState(mockSubjects);
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.ACP).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BMK2).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BEAM).Action());
            expect(newState.Subjects.filter((x) => x.Code === CodeOf.BEAM)[0].ClashReport.Type)
                .to.eq("group");
        });
    });

    describe("behaviour of subject deselection", () => {
        it("case 1", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU32013' [BKA]
            And Then When Ali deselected subject 'MPU34022' [ACP]
            Then Ali shall see that the clash report on [BKA] is cleared `;
            const initialState = new SubjectListState(mockSubjects);
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.ACP).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BKA).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.ACP).Action());
            expect(newState.Subjects.filter((x) => x.Code === CodeOf.BKA)[0].ClashReport).to.eq(null);
        });

        it("case 2", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU32013' [BKA] (which is clashgin with ACP)
            And Then Ali selected subject 'MPU3143' [BMK2] (which is clashing with BKA)
            And Then When Ali deselected subject 'MPU34022' [ACP]
            Then Ali shall see that the clash report's on [BKA] is updated to [BMK2] `;
            const initialState = new SubjectListState(mockSubjects);
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.ACP).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BKA).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BMK2).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.ACP).Action());
            expect(newState.Subjects.filter((x) => x.Code === CodeOf.BKA )[0].ClashReport.TargetName)
                .to.eq("Bahasa Melayu Komunikasi 2");
        });

        it("case 3", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU3143' [BMK2]
            And Then Ali selected subject 'UKMM1043' [BEAM]
            And Then When Ali deselected subject [ACP] or [BMK2]
            Then Ali shall see that the clash report on [BEAM] is cleared `;
            const initialState = new SubjectListState(mockSubjects);
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.ACP).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BMK2).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BEAM).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BMK2).Action());
            expect(newState.Subjects.filter((x) => x.Code === CodeOf.BEAM)[0].ClashReport).to.eq(null);
        });

        it("case 4", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected [ACP]
            And Then Ali selected [BMK2]
            And Then Ali selected [BEAM]
            And Then When Ali deselected [BMK2]
            Then Ali shall that the clash report on [BEAM] is gone`;

            const initialState = new SubjectListState(mockSubjects);
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.ACP).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BMK2).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BEAM).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BMK2).Action());
            expect(newState.Subjects.filter((x) => x.Code === CodeOf.BEAM)[0].ClashReport)
                .to.eq(null);
        });

        it("case 5", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected [ACP]
            And Then Ali selected [BMK2]
            And Then Ali selected [BEAM].
            By this time Ali shall see that [BEAM] have a group clash report on it.
            And Then Ali selected [HE]
            And Then When Ali deselected [HE]
            Then Ali shall that the clash report on [BEAM] is still there`;

            const initialState = new SubjectListState(mockSubjects);
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(CodeOf.ACP).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BMK2).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.BEAM).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.HE).Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection(CodeOf.HE).Action());
            expect(newState.Subjects.filter((x) => x.Code === CodeOf.BEAM)[0].ClashReport.Type)
                .to.eq("group");
        });
    });

});

describe("FindTimetableBasedOn", () => {
    it("should return a list of timetables", () => {
        const subjects = mockSubjects;
        const titas = subjects.filter((s) => s.Code === CodeOf.TITA)[0];
        const wwt = subjects.filter((s) => s.Code === CodeOf.WWT)[0];
        const timetables = FindTimetableBasedOn([wwt, titas]);
        expect(timetables).to.have.lengthOf(5);
    });

});

describe("CheckForClashesBetween", () => {
    it("case 1", () => {
        const subjects = mockSubjects;
        const titas = subjects.filter((s) => s.Code === CodeOf.TITA)[0];
        const wwt = subjects.filter((s) => s.Code === CodeOf.WWT)[0];
        const bmk2 = subjects.filter((s) => s.Code === CodeOf.BMK2)[0];
        wwt.ClashingCounterparts.push(CodeOf.TITA);
        const result = CheckForClashesBetween(titas, [bmk2, wwt]);
        expect(result.Type).to.eq("single");
        expect(result.TargetName).to.eq("Water & Wastewater Treatment");
    });

});
