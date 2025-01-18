"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryUsage = exports.Complexity = void 0;
var Complexity;
(function (Complexity) {
    Complexity["LOGARITHMIC"] = "O(log n)";
    Complexity["LINEAR"] = "O(n)";
    Complexity["LINEARITHMIC"] = "O(n log n)";
    Complexity["QUADRATIC"] = "O(n^2)";
    Complexity["FOUR_THIRDS"] = "O(n^(4/3))";
})(Complexity || (exports.Complexity = Complexity = {}));
var MemoryUsage;
(function (MemoryUsage) {
    MemoryUsage["CONSTANT"] = "O(1)";
    MemoryUsage["LOGARITHMIC"] = "O(log n)";
    MemoryUsage["LINEAR"] = "O(n)";
})(MemoryUsage || (exports.MemoryUsage = MemoryUsage = {}));
