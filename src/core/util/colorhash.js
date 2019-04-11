"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorhash = new (require("color-hash"))({
    // lightness: 0.75,
    saturation: 0.5,
});
// Memoization to improve performance
const memo = {};
exports.ColorHash = (x) => {
    const result = memo[x];
    if (result) {
        return result;
    }
    else {
        const temp = colorhash.hex(x); // eslint-disable-line no-undef
        memo[x] = temp;
        return temp;
    }
};
//# sourceMappingURL=colorhash.js.map