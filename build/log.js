"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = log;
var constants_1 = require("./constants");
function log(level, message, plain) {
    if (constants_1.LOG_LEVEL_VALUE[level] > constants_1.LOG_LEVEL_VALUE[constants_1.SELECTED_LOG_LEVEL]) {
        return;
    }
    try {
        var date = new Date().toISOString();
        if (plain)
            console.log("[".concat(date, "] ").concat(level, ": ").concat(message));
        else {
            var color = constants_1.LOG_LEVEL_ANSI_CODES[level];
            console.log("".concat(color, "[").concat(date, "] ").concat(level, ": ").concat(message, "\u001B[0m"));
        }
    }
    catch (error) {
        console.warn("Failed to log message", error);
    }
}
