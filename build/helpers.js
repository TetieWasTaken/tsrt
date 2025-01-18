"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlgorithms = getAlgorithms;
exports.convertToNumbers = convertToNumbers;
exports.getRandoms = getRandoms;
exports.findAlgorithm = findAlgorithm;
exports.compare = compare;
var fs = require("node:fs");
var log_1 = require("./log");
var constants_1 = require("./constants");
var node_process_1 = require("node:process");
/**
 * Get a list of available algorithms
 * @returns list of available algorithms
 */
function getAlgorithms(plain) {
    try {
        var files = fs.readdirSync("./algorithms");
        return files.map(function (f) { return f.split(".")[0]; }).filter(function (f) {
            if (constants_1.IGNORED_ALGORITHMS.includes(f)) {
                (0, log_1.default)(constants_1.LOG_LEVEL.DEBUG, "Ignoring algorithm: ".concat(f), plain);
                return false;
            }
            return true;
        });
    }
    catch (error) {
        (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, "Could not find algorithms directory: ".concat(error.message), plain);
        (0, node_process_1.exit)(1);
    }
}
function convertToNumbers(input) {
    return input.map(function (i) {
        if (isNaN(Number(i))) {
            return i;
        }
        return Number(i);
    });
}
/**
 * Get a list of random numbers
 * @param size the size of the list
 * @returns the list of random numbers
 */
function getRandoms(size) {
    return Array.from({ length: size }, function () { return Math.floor(Math.random() * size); });
}
/**
 * Retrieve the algorithm function from the algorithms directory
 * @param algorithm the algorithm name to retrieve
 * @returns the algorithm function
 */
function findAlgorithm(algorithm, plain) {
    (0, log_1.default)(constants_1.LOG_LEVEL.DEBUG, "Finding algorithm: ".concat(algorithm), plain);
    try {
        // get all files in the algorithms directory
        var files = fs.readdirSync("./algorithms");
        if (!files.length) {
            (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, "No algorithms found", plain);
            (0, node_process_1.exit)(1);
        }
        // find which file contains the algorithm
        var file = files.find(function (f) { return f.split(".")[0] === algorithm; });
        if (!file) {
            (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, "Could not find algorithm: ".concat(algorithm), plain);
            (0, node_process_1.exit)(1);
        }
        (0, log_1.default)(constants_1.LOG_LEVEL.DEBUG, "Found algorithm: ".concat(algorithm), plain);
        // return the default export of the file
        return require("./algorithms/".concat(file)).default;
    }
    catch (error) {
        (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, "Could not find algorithm: ".concat(algorithm, " - ").concat(error.message), plain);
        (0, node_process_1.exit)(1);
    }
}
/**
 * Compare two string/number values
 * @param a value 1
 * @param b value 2
 * @returns -1 if a < b, 0 if a === b, 1 if a > b
 */
function compare(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a - b;
    }
    if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
    }
    return typeof a === "number" ? -1 : 1; // numbers come before strings
}
