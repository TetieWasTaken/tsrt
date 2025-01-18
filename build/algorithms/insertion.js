"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = insertionSort;
/**
 * Sorts by comparisons between elements before the current element
 * @param arr the array to sort
 * @param start the start index of the array
 * @param end the end index of the array
 * @param compareFunction the function to compare elements
 * @returns the sorted array
 */
function insertionSort(arr, start, end, compareFunction) {
    if (start === void 0) { start = 0; }
    if (end === void 0) { end = arr.length - 1; }
    if (compareFunction === void 0) { compareFunction = function (a, b) { return (a > b ? 1 : a < b ? -1 : 0); }; }
    for (var i = start + 1; i <= end; i++) {
        var key = arr[i];
        var j = i - 1;
        while (j >= start && compareFunction(arr[j], key) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}
