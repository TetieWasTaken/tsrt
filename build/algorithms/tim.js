"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = timSort;
var merge_1 = require("./merge");
/**
 * Find runs in the array
 * @param arr the array to find runs in
 * @returns {number[][]} the runs in the array
 */
function findRuns(arr) {
    var runs = [];
    var start = 0;
    var end = 1;
    while (end < arr.length) {
        if (arr[end] < arr[end - 1]) {
            runs.push(arr.slice(start, end));
            start = end;
        }
        end++;
    }
    runs.push(arr.slice(start, end));
    return runs;
}
/**
 * Sort a run using insertion sort
 * @param runs the run to sort
 * @returns {number[]} the sorted run
 */
function mergeRuns(runs) {
    while (runs.length > 1) {
        var left = runs.shift();
        var right = runs.shift();
        runs.push((0, merge_1.merge)(left, right));
    }
    return runs.length > 0 ? runs[0] : [];
}
/**
 * Sort by dividing the input into runs, sorting them using insertion sort, and then merging them using the merge sort algorithm
 * @param arr the array to sort
 * @returns {number[]} the sorted array
 */
function timSort(arr) {
    var runs = findRuns(arr);
    var sortedRuns = runs.map(function (run) { return (0, merge_1.default)(run, 32); });
    return mergeRuns(sortedRuns);
}
