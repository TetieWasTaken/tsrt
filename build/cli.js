#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extra_typings_1 = require("@commander-js/extra-typings");
var helpers_1 = require("./helpers");
var constants_1 = require("./constants");
var fs = require("node:fs");
var sort_1 = require("./sort");
var log_1 = require("./log");
var benchmark_1 = require("./benchmark");
var node_process_1 = require("node:process");
var algorithms = (0, helpers_1.getAlgorithms)(false);
var program = new extra_typings_1.Command()
    .version("1.0.3", "-v, --version", "output the current version")
    .addOption(new extra_typings_1.Option("-a, --algorithm <algorithm>", "the algorithm to use").choices(algorithms).default("none"))
    .addOption(new extra_typings_1.Option("-f, --file <file>", "the file to sort").conflicts("input"))
    .addOption(new extra_typings_1.Option("-i, --input <input>", "the input to sort").conflicts("file"))
    .addOption(new extra_typings_1.Option("-o, --output <output>", "the file to write the sorted output"))
    .addOption(new extra_typings_1.Option("-b, --benchmark", "benchmark the selected (-a) algorithm, or all algorithms if none is selected")
    .conflicts(["file", "input", "benchmarkAll"]))
    .addOption(new extra_typings_1.Option("--benchmark-iterations <iterations>", "the number of iterations to benchmark").hideHelp())
    .addOption(new extra_typings_1.Option("--benchmark-size <size>", "the size of the random list to benchmark").hideHelp())
    .addOption(new extra_typings_1.Option("-p, --plain", "do not use formatting for output").hideHelp().default(false))
    .action(function (options, command) {
    if (!options.file && !options.input && !options.benchmark) {
        (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, "You must specify either a file, input, or a benchmark option", options.plain);
        command.help();
    }
});
try {
    program.parse();
}
catch (error) {
    (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, error.message, false);
    (0, node_process_1.exit)(1);
}
var options;
try {
    options = program.opts();
}
catch (error) {
    (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, error.message, false);
    (0, node_process_1.exit)(1);
}
try {
    if (options.benchmark) {
        (0, benchmark_1.bench)(options.algorithm == "none" ? algorithms : [options.algorithm], Number(options.benchmarkIterations) || undefined, Number(options.benchmarkSize) || undefined, options.plain);
    }
    else {
        var algorithm = options.algorithm == "none"
            ? constants_1.DEFAULT_ALGORITHM
            : options.algorithm;
        var input = void 0;
        if (options.file) {
            input = (0, sort_1.getData)(options.file, options.plain);
        }
        else if (options.input) {
            if (options.input.includes(",")) {
                input = options.input.split(",");
            }
            else {
                (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, "Unsupported input format", options.plain);
                (0, node_process_1.exit)(1);
            }
        }
        if (!input) {
            (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, "Could not get input data", options.plain);
            (0, node_process_1.exit)(1);
        }
        var convertedInput = (0, helpers_1.convertToNumbers)(input);
        var sorted = (0, sort_1.default)(algorithm, convertedInput, options.plain);
        if (options.output) {
            (0, log_1.default)(constants_1.LOG_LEVEL.INFO, "Storing result in ".concat(options.output, "..."), options.plain);
            fs.writeFileSync(options.output, options.plain ? sorted.join(",") : sorted.join("\n"));
        }
        else {
            options.plain
                ? console.log(sorted.join(","))
                : console.log(sorted.join("\n"));
        }
    }
}
catch (error) {
    (0, log_1.default)(constants_1.LOG_LEVEL.ERROR, error.message, options.plain);
    (0, node_process_1.exit)(1);
}
