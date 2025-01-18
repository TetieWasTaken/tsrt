"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.algorithmData = void 0;
exports.default = heapSort;
var helpers_1 = require("../helpers");
var types_1 = require("./types");
/**
 * Heapify a subtree rooted with node i which is an index in arr[].
 * @param arr - the array to heapify
 * @param n - the size of the heap
 * @param i - the index of the root node
 */
function heapify(arr, n, i) {
    var _a;
    var largest = i;
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    if (left < n && (0, helpers_1.compare)(arr[left], arr[largest]) > 0) {
        largest = left;
    }
    if (right < n && (0, helpers_1.compare)(arr[right], arr[largest]) > 0) {
        largest = right;
    }
    if (largest !== i) {
        _a = [arr[largest], arr[i]], arr[i] = _a[0], arr[largest] = _a[1];
        heapify(arr, n, largest);
    }
}
/**
 * Sort by using the heap sort algorithm; it builds a max heap from the input, then repeatedly extracts the maximum element from the heap and places it at the end of the array.
 * @param arr - the array of elements to sort.
 * @returns the sorted array.
 */
function heapSort(arr) {
    var _a;
    var n = arr.length;
    // build max heap
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    // extract elements from heap
    for (var i = n - 1; i > 0; i--) {
        _a = [arr[i], arr[0]], arr[0] = _a[0], arr[i] = _a[1];
        heapify(arr, i, 0);
    }
    return arr;
}
exports.algorithmData = {
    name: "Heap sort",
    complexity: types_1.Complexity.LINEARITHMIC,
    memoryUsage: types_1.MemoryUsage.CONSTANT,
    stable: false,
    inPlace: true,
    description: "Heap Sort is a comparison-based sorting algorithm that builds a heap from the input data and repeatedly extracts the maximum element to place at the end.",
};
