"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGNORED_ALGORITHMS = exports.LOG_LEVEL_ANSI_CODES = exports.SELECTED_LOG_LEVEL = exports.LOG_LEVEL_VALUE = exports.LOG_LEVEL = exports.DEFAULT_ALGORITHM = void 0;
// block isn't the fastest, but most consistent and stable
exports.DEFAULT_ALGORITHM = "block";
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL["ERROR"] = "ERROR";
    LOG_LEVEL["INFO"] = "INFO";
    LOG_LEVEL["DEBUG"] = "DEBUG";
})(LOG_LEVEL || (exports.LOG_LEVEL = LOG_LEVEL = {}));
var LOG_LEVEL_VALUE;
(function (LOG_LEVEL_VALUE) {
    LOG_LEVEL_VALUE[LOG_LEVEL_VALUE["ERROR"] = 0] = "ERROR";
    LOG_LEVEL_VALUE[LOG_LEVEL_VALUE["INFO"] = 1] = "INFO";
    LOG_LEVEL_VALUE[LOG_LEVEL_VALUE["DEBUG"] = 2] = "DEBUG";
})(LOG_LEVEL_VALUE || (exports.LOG_LEVEL_VALUE = LOG_LEVEL_VALUE = {}));
exports.SELECTED_LOG_LEVEL = LOG_LEVEL.INFO;
exports.LOG_LEVEL_ANSI_CODES = (_a = {},
    _a[LOG_LEVEL.ERROR] = "\x1b[31m",
    _a[LOG_LEVEL.INFO] = "\x1b[32m",
    _a[LOG_LEVEL.DEBUG] = "\x1b[34m",
    _a);
exports.IGNORED_ALGORITHMS = ["types", "insertion"];
