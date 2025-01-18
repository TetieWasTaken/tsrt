"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = shellSort;
var helpers_1 = require("../helpers");
/**
 * Sort by comparing elements that are a certain distance apart and then reducing the distance
 * @param arr the array to sort
 * @returns {(number[] | string[])} the sorted array
 */
function shellSort(arr) {
    var gap = Math.floor(arr.length / 2);
    while (gap > 0) {
        for (var i = gap; i < arr.length; i++) {
            var temp = arr[i];
            var j = i;
            while (j >= gap && (0, helpers_1.compare)(arr[j - gap], temp) > 0) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}
