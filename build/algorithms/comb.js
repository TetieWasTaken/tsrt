"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = combSort;
var helpers_1 = require("../helpers");
/**
 * Sort by comparing elements that are a certain distance apart and then reducing the distance
 * @param {(number|string)[]} arr - the array of numbers or strings to be sorted.
 * @returns {(number|string)[]} - the sorted array.
 */
function combSort(arr) {
    var _a;
    var shrinkFactor = 1.3;
    var gap = arr.length;
    var swapped = true;
    while (gap > 1 || swapped) {
        gap = Math.max(Math.floor(gap / shrinkFactor), 1);
        swapped = false;
        for (var i = 0; i + gap < arr.length; i++) {
            if ((0, helpers_1.compare)(arr[i], arr[i + gap]) > 0) {
                _a = [arr[i + gap], arr[i]], arr[i] = _a[0], arr[i + gap] = _a[1];
                swapped = true;
            }
        }
    }
    return arr;
}
