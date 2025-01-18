"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = countingSort;
/**
 * Sort by counting the number of occurrences of each element
 * @param arr - the array of numbers to be sorted.
 * @returns the sorted array.
 */
function countingSort(arr) {
    if (arr.length === 0)
        return [];
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    var count = Array(max + 1).fill(0);
    for (var i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }
    var sorted = [];
    for (var i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            sorted.push(i);
            count[i]--;
        }
    }
    return sorted;
}
