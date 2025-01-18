"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = selectionSort;
/**
 * Sort by finding the minimum element from the unsorted portion and swapping it with the first element
 * @param arr the array to sort
 * @returns {(number[] | string[])} the sorted array
 */
function selectionSort(arr) {
    var _a;
    for (var i = 0; i < arr.length; i++) {
        var minIndex = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            _a = [arr[minIndex], arr[i]], arr[i] = _a[0], arr[minIndex] = _a[1];
        }
    }
    return arr;
}
