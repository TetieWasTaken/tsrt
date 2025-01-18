"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = getData;
exports.default = sort;
var fs = require("node:fs");
var log_1 = require("./log");
var constants_1 = require("./constants");
var node_process_1 = require("node:process");
var helpers_1 = require("./helpers");
var node_process_2 = require("node:process");
/**
 * Get the data from the specified file
 * @param file the path to the file
 * @returns the file contents
 */
function getData(file, plain) {
    (0, log_1.default)(constants_1.LOG_LEVEL.DEBUG, "Getting data from file: ".concat(file), plain);
    try {
        fs.accessSync(file, fs.constants.R_OK);
    }
    catch (error) {
        (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, "Could not access file: ".concat(file, " - ").concat(error.message), plain);
        (0, node_process_2.exit)(1);
    }
    try {
        return fs.readFileSync(file, "utf-8").split("\n");
    }
    catch (error) {
        (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, "Could not read file: ".concat(file, " - ").concat(error.message), plain);
        (0, node_process_2.exit)(1);
    }
}
/**
 * Sort the file using the specified algorithm
 * @param algorithm the algorithm to use
 * @param file the path to the file to sort
 * @returns the sorted file
 */
function sort(algorithm, input, plain) {
    var sorted = [];
    var startPerf = node_process_1.hrtime.bigint();
    try {
        sorted = (0, helpers_1.findAlgorithm)(algorithm, plain)(input);
    }
    catch (error) {
        (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, "Could not run algorithm: ".concat(algorithm, " - ").concat(error.message), plain);
        (0, node_process_2.exit)(1);
    }
    var endPerf = node_process_1.hrtime.bigint() - startPerf;
    (0, log_1.default)(constants_1.LOG_LEVEL.INFO, "Sorted ".concat(input.length, " elements in ").concat(Number(endPerf) / 1e6, "ms"), plain);
    return sorted.map(function (s) { return s.toString(); });
}
