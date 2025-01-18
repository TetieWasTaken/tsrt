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
exports.bench = bench;
var helpers_1 = require("./helpers");
var node_process_1 = require("node:process");
var log_1 = require("./log");
var constants_1 = require("./constants");
var readline = require("node:readline");
var node_process_2 = require("node:process");
function updateProgressBar(algorithm, iteration, totalIterations, totalAlgorithms, currentAlgorithm) {
    var barLength = 40;
    var filledLength = Math.round((barLength * iteration) / totalIterations);
    var bar = "\x1b[32m█".repeat(filledLength) +
        "\x1b[0m-".repeat(barLength - filledLength);
    readline.cursorTo(node_process_2.stdout, 0);
    node_process_2.stdout.clearLine(0);
    node_process_2.stdout.write("\u001B[36mAlgorithm: ".concat(algorithm, "\u001B[0m (").concat(currentAlgorithm, "/").concat(totalAlgorithms, ") | \u001B[33mIteration: ").concat(iteration, "/").concat(totalIterations, "\u001B[0m | Progress: [").concat(bar, "\u001B[0m]"));
}
function bench(algorithms, iterations, size, plain) {
    if (iterations === void 0) { iterations = 15; }
    if (size === void 0) { size = 10000; }
    if (plain === void 0) { plain = false; }
    // todo: also iterate through different random lists, as another iteration
    var randoms = (0, helpers_1.getRandoms)(size);
    if (size > 120000) {
        algorithms = algorithms.filter(function (algorithm) { return algorithm !== "radix"; });
    }
    (0, log_1.default)(constants_1.LOG_LEVEL.INFO, "Benchmarking ".concat(algorithms.join(", "), " with ").concat(size, " elements and ").concat(iterations, " iterations"), plain);
    var results = algorithms.map(function (algorithm) {
        var sort = (0, helpers_1.findAlgorithm)(algorithm, plain);
        var totalTime = BigInt(0);
        var minTime = BigInt(Number.MAX_SAFE_INTEGER);
        var maxTime = BigInt(Number.MIN_SAFE_INTEGER);
        var times = [];
        for (var i = 0; i < iterations; i++) {
            updateProgressBar(algorithm, i + 1, iterations, algorithms.length, algorithms.indexOf(algorithm) + 1);
            var start = node_process_1.hrtime.bigint();
            sort(__spreadArray([], randoms, true));
            var end = node_process_1.hrtime.bigint();
            var iterationTime = end - start;
            times.push(iterationTime);
            totalTime += iterationTime;
            if (iterationTime < minTime)
                minTime = iterationTime;
            if (iterationTime > maxTime)
                maxTime = iterationTime;
            (0, log_1.default)(constants_1.LOG_LEVEL.DEBUG, "Iteration ".concat(i + 1, " took ").concat(Number(iterationTime) / 1e6, "ms"), plain);
        }
        var averageTime = Number(totalTime) / (1e6 * iterations);
        var minTimeMs = Number(minTime) / 1e6;
        var maxTimeMs = Number(maxTime) / 1e6;
        // median
        times.sort(function (a, b) { return Number(a - b); });
        var medianTime = times.length % 2 === 0
            ? (Number(times[times.length / 2 - 1] + BigInt(Number(times[times.length / 2]))) /
                2) / 1e6
            : Number(times[Math.floor(times.length / 2)]) / 1e6;
        // variance/std deviation
        var meanTime = Number(totalTime) / iterations;
        var variance = times.reduce(function (acc, time) {
            return acc + Math.pow((Number(time) - meanTime), 2);
        }, 0) / iterations;
        var stdDeviation = Math.sqrt(variance) / 1e6;
        return {
            algorithm: algorithm,
            averageTime: averageTime,
            minTime: minTimeMs,
            maxTime: maxTimeMs,
            medianTime: medianTime,
            stdDeviation: stdDeviation,
        };
    });
    // sort by average time
    results.sort(function (a, b) { return a.averageTime - b.averageTime; });
    // clear progress bar
    readline.cursorTo(node_process_2.stdout, 0);
    node_process_2.stdout.clearLine(0);
    console.table(results.map(function (result) { return ({
        Algorithm: result.algorithm,
        "Average (ms)": result.averageTime.toPrecision(5),
        "Min (ms)": result.minTime.toPrecision(5),
        "Max (ms)": result.maxTime.toPrecision(5),
        "Median (ms)": result.medianTime.toPrecision(5),
        "Std Dev (ms)": result.stdDeviation.toPrecision(5),
        "Range (ms)": (result.maxTime - result.minTime).toPrecision(5),
        "ms/element": (result.averageTime / size).toPrecision(5),
    }); }));
}
