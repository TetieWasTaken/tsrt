"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = quickSort;
var helpers_1 = require("../helpers");
/**
 * Partition the array around the pivot element
 * @param arr the array to partition
 * @param start the start index (default is 0)
 * @param end the end index (default is arr.length - 1)
 * @returns {number} the index of the pivot element
 */
function partition(arr, start, end) {
    var _a, _b;
    var pivot = arr[end];
    var i = start - 1;
    for (var j = start; j < end; j++) {
        if ((0, helpers_1.compare)(arr[j], pivot) < 0) {
            i++;
            _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
        }
    }
    _b = [arr[end], arr[i + 1]], arr[i + 1] = _b[0], arr[end] = _b[1];
    return i + 1;
}
/**
 * Sort by partitioning the array around a pivot element
 * @param arr the array to sort
 * @param start the start index
 * @param end the end index
 * @returns {T[]} the sorted array
 */
function quickSort(arr, start, end) {
    if (start === void 0) { start = 0; }
    if (end === void 0) { end = arr.length - 1; }
    if (arr.length === 0) {
        return arr;
    }
    if (start < end) {
        var pivotIndex = partition(arr, start, end);
        quickSort(arr, start, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, end);
    }
    return arr;
}
