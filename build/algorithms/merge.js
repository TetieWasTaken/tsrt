"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.algorithmData = void 0;
exports.merge = merge;
exports.default = mergeSort;
var helpers_1 = require("../helpers");
var types_1 = require("./types");
/**
 * Merge two sorted arrays
 * @param left the left array
 * @param right the right array
 * @returns the merged array
 */
function merge(left, right) {
    var result = [];
    var leftIndex = 0;
    var rightIndex = 0;
    // Use the custom compare function
    while (leftIndex < left.length && rightIndex < right.length) {
        if ((0, helpers_1.compare)(left[leftIndex], right[rightIndex]) < 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        }
        else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return __spreadArray(__spreadArray(__spreadArray([], result, true), left.slice(leftIndex), true), right.slice(rightIndex), true);
}
/**
 * Sort an array by recursively splitting it into two halves, sorting the halves, and merging them.
 * @param arr the array to sort
 * @returns the sorted array
 */
function mergeSort(arr, minRun) {
    if (minRun === void 0) { minRun = 1; }
    if (arr.length <= minRun) {
        return arr;
    }
    var mid = Math.floor(arr.length / 2);
    var left = mergeSort(arr.slice(0, mid), minRun);
    var right = mergeSort(arr.slice(mid), minRun);
    return merge(left, right);
}
exports.algorithmData = {
    name: "Merge sort",
    complexity: types_1.Complexity.LINEARITHMIC,
    memoryUsage: types_1.MemoryUsage.LINEAR,
    stable: true,
    inPlace: false,
    description: "Merge Sort is a divide-and-conquer algorithm that recursively splits the array into halves, sorts each half, and then merges the sorted halves.",
};
