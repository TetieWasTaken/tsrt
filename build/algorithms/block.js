"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.algorithmData = void 0;
exports.default = blockSort;
var helpers_1 = require("../helpers");
var insertion_1 = require("./insertion");
var types_1 = require("./types");
/**
 * Merge function for block sort
 * @param arr array of elements to be merged
 * @param start the start index
 * @param mid the middle index
 * @param end the ending index of the subarray to be merged
 */
function merge(arr, start, mid, end) {
    var left = arr.slice(start, mid + 1);
    var right = mid < end ? arr.slice(mid + 1, end + 1) : [];
    var i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
        if ((0, helpers_1.compare)(left[i], right[j]) <= 0) {
            arr[k++] = left[i++];
        }
        else {
            arr[k++] = right[j++];
        }
    }
    while (i < left.length) {
        arr[k++] = left[i++];
    }
    while (j < right.length) {
        arr[k++] = right[j++];
    }
}
/**
 * Sort by dividing the input into blocks, sorting them using insertion sort, and then merging them using the merge sort algorithm
 * @param arr array of elements to be sorted
 * @returns {T[]} the sorted array
 */
function blockSort(arr) {
    var blockSize = Math.floor(Math.sqrt(arr.length));
    for (var i = 0; i < arr.length; i += blockSize) {
        (0, insertion_1.default)(arr, i, Math.min(i + blockSize - 1, arr.length - 1), helpers_1.compare);
    }
    var currentBlockSize = blockSize;
    while (currentBlockSize < arr.length) {
        for (var start = 0; start + currentBlockSize < arr.length; start += 2 * currentBlockSize) {
            var mid = start + currentBlockSize - 1;
            var end = Math.min(start + 2 * currentBlockSize - 1, arr.length - 1);
            merge(arr, start, mid, end);
        }
        currentBlockSize *= 2;
    }
    return arr;
}
exports.algorithmData = {
    name: "Block sort",
    complexity: types_1.Complexity.LINEARITHMIC,
    memoryUsage: types_1.MemoryUsage.LINEAR,
    stable: true,
    inPlace: true,
    description: "Block sort is a sorting algorithm that divides the input into blocks, sorts them using insertion sort, and then merges them using the merge sort algorithm.",
};
