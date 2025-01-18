"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.algorithmData = void 0;
exports.default = shellSort;
var helpers_1 = require("../helpers");
var types_1 = require("./types");
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
exports.algorithmData = {
    name: "Shellsort",
    complexity: types_1.Complexity.FOUR_THIRDS,
    memoryUsage: types_1.MemoryUsage.CONSTANT,
    stable: false,
    inPlace: true,
    description: "Shellsort is an in-place comparison-based algorithm that sorts the elements by comparing elements that are a certain distance apart and then reducing the distance. (measuring actual complexity is difficult, may not be accurate)",
};
