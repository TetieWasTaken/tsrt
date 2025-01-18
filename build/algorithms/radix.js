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
exports.default = radixSort;
var console_1 = require("console");
var constants_1 = require("../constants");
var process_1 = require("process");
var types_1 = require("./types");
/**
 * Sort by distributing elements into buckets based on their digits
 * @param arr the array to sort
 * @returns {Array<number | string>} the sorted array
 */
function radixSort(arr) {
    if (arr.length === 0)
        return arr;
    if (arr.length > 120000) {
        (0, console_1.log)(constants_1.LOG_LEVEL.ERROR, "Array too large for radix sort. Please use quick sort or reduce the size of the array.", false);
        (0, process_1.exit)(1);
    }
    // separate numbers and strings
    var numbers = arr.filter(function (item) { return typeof item === "number"; });
    var strings = arr.filter(function (item) { return typeof item === "string"; });
    if (numbers.length > 0) {
        var max = Math.max.apply(Math, numbers);
        var maxDigits = Math.floor(Math.log10(max)) + 1;
        for (var i = 0; i < maxDigits; i++) {
            var buckets = Array.from({ length: 10 }, function () { return []; });
            for (var j = 0; j < numbers.length; j++) {
                var num = numbers[j];
                var digit = Math.floor(num / Math.pow(10, i)) % 10;
                buckets[digit].push(num);
            }
            numbers.length = 0;
            for (var _i = 0, buckets_1 = buckets; _i < buckets_1.length; _i++) {
                var bucket = buckets_1[_i];
                numbers.push.apply(numbers, bucket);
            }
        }
    }
    if (strings.length > 0) {
        var maxLength = Math.max.apply(Math, strings.map(function (str) { return str.length; }));
        for (var i = maxLength - 1; i >= 0; i--) {
            var buckets = Array.from({ length: 256 }, function () { return []; });
            for (var j = 0; j < strings.length; j++) {
                var str = strings[j];
                var charCode = i < str.length ? str.charCodeAt(i) : 0;
                buckets[charCode].push(str);
            }
            strings.length = 0;
            for (var _a = 0, buckets_2 = buckets; _a < buckets_2.length; _a++) {
                var bucket = buckets_2[_a];
                strings.push.apply(strings, bucket);
            }
        }
    }
    return __spreadArray(__spreadArray([], numbers, true), strings, true);
}
exports.algorithmData = {
    name: "Radix sort",
    complexity: types_1.Complexity.LINEAR,
    memoryUsage: types_1.MemoryUsage.LINEAR,
    stable: true,
    inPlace: false,
    description: "Radix sort is a non-comparative sorting algorithm that sorts elements by distributing them into smaller buckets based on their digits (radix).",
};
