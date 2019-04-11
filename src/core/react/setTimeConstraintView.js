"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("@material-ui/core/Button");
const Dialog_1 = require("@material-ui/core/Dialog");
// import Slide from "@material-ui/core/transitions/Slide";
const Typography_1 = require("@material-ui/core/Typography");
const React = require("react");
// @ts-ignore
const react_countup_1 = require("react-countup");
const stcBox_1 = require("../model/matrix/stcBox");
const stackPanel_1 = require("./panels/stackPanel");
const timetableView_1 = require("./timetableView/timetableView");
exports.NO_OPERATION = () => { };
// region style
const typo1Style = {
    marginTop: "15px",
    marginLeft: "65px",
    marginRight: "10px"
};
const divStyle = {
    textAlign: "center",
    overflowY: "auto"
};
const tableStyle = {
    width: "100%"
};
const legendFrameStyle = {
    height: "100px",
    margin: "0 auto",
    width: "400",
    border: "solid 1px lightgrey",
    padding: "10px"
};
const cancelButtonStyle = {
    marginRight: "10px"
};
const Legend = (props) => {
    const background = () => {
        switch (props.type) {
            case "red":
                return stcBox_1.ColorOfDefinitelyOccupied;
            case "grey":
                return stcBox_1.ColorOfDefinitelyUnoccupied;
            case "green":
                return stcBox_1.ColorOfMaybeOccupied;
        }
    };
    const legendSymbol = {
        marginRight: "10px",
        width: "30px",
        height: "20px",
        float: "left",
        background: background()
    };
    const legendLabel = {
        float: "left"
    };
    return (React.createElement("tr", null,
        React.createElement("td", { style: legendSymbol }),
        React.createElement("td", { style: legendLabel },
            React.createElement(Typography_1.default, { variant: "subheading" }, props.label))));
};
class SetTimeConstraintView extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(Dialog_1.default, { open: this.props.isOpen, fullScreen: true },
                React.createElement("div", { style: divStyle },
                    React.createElement("table", { style: tableStyle },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement(Typography_1.default, { variant: "display3", style: typo1Style, gutterBottom: false, align: "center" }, "Set time constraint")),
                                React.createElement("td", null,
                                    React.createElement("table", { style: legendFrameStyle },
                                        React.createElement("tbody", null,
                                            React.createElement(Legend, { type: "grey", label: "Definitely no class" }),
                                            React.createElement(Legend, { type: "red", label: "Definitely have class" }),
                                            React.createElement(Legend, { type: "green", label: "Click me if you don't want to have class here" }))))))),
                    React.createElement(timetableView_1.TimetableView, { slots: [], isShowingAlternativeSlots: false, alternateSlots: null, isShowingAlternativeSlotOf: null, stcBoxes: this.props.totalMatrix, handleSelectSlotChoice: exports.NO_OPERATION, handleGoToThisAlternateSlot: exports.NO_OPERATION, handleShowAlternateSlot: exports.NO_OPERATION, handleToggleIsOpenOfSummary: exports.NO_OPERATION, handleSetTimeContraintAt: this.props.handleSetTimeConstraintAt, handleDesetTimeContraintAt: this.props.handleDesetTimeConstraintAt }),
                    React.createElement("div", null, "This feature is to help you to reduce the number of possible timetables, so that it will be easier for you to pick your favourite timetables."),
                    React.createElement("p", null,
                        React.createElement("i", null,
                            React.createElement("b", null, "Therefore, click as many green boxes as possible!"))),
                    React.createElement(Report, { numberOfRemovedTimetables: this.props.numberOfRemovedTimetables, numberOfRemainingTimetables: this.props.numberOfRemainingTimetables }),
                    React.createElement("br", null),
                    React.createElement(Button_1.default, { style: cancelButtonStyle, color: "default", onClick: this.props.handleCancel }, "Cancel"),
                    React.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: this.props.handleCancel }, "Done")))));
    }
}
exports.SetTimeConstraintView = SetTimeConstraintView;
const Report = (props) => {
    const style = {
        fontSize: "14px"
    };
    return (React.createElement("span", { style: style },
        React.createElement(stackPanel_1.StackPanel, { orientation: "horizontal", horizontalAlignment: "center" },
            React.createElement(react_countup_1.default, { start: 0, end: props.numberOfRemovedTimetables, duration: 0.65 }),
            React.createElement("span", null, "timetables are removed."),
            React.createElement(react_countup_1.default, { start: 0, end: props.numberOfRemainingTimetables, duration: 0.65 }),
            React.createElement("span", null, "timetables remaining."))));
};
//# sourceMappingURL=setTimeConstraintView.js.map