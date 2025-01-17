import { Command, Option } from "@commander-js/extra-typings";
import { getAlgorithms } from "./helpers";
import { DEFAULT_ALGORITHM, LOG_LEVEL } from "./constants";
import fs from "fs";
import sort from "./sort";
import log from "./log";
import { bench } from "./benchmark";

const algorithms = getAlgorithms();

const program = new Command()
  .version("0.0.1", "-v, --version", "output the current version")
  .addOption(
    new Option("-a, --algorithm <algorithm>", "the algorithm to use").choices(
      algorithms,
    ).default(
      DEFAULT_ALGORITHM,
    ),
  )
  .addOption(
    new Option("-f, --file <file>", "the file to sort").conflicts(
      "input",
    ),
  )
  .addOption(
    new Option("-i, --input <input>", "the input to sort").conflicts(
      "file",
    ),
  )
  .addOption(
    new Option("-o, --output <output>", "the file to write the sorted output"),
  )
  .addOption(
    new Option("-b, --benchmark", "benchmark the algorithm").conflicts(
      ["file", "input", "benchmarkAll"],
    ),
  )
  .addOption(
    new Option("--benchmark-all", "benchmark all algorithms").conflicts(
      ["file", "input, benchmark"],
    ),
  )
  .action((options, command) => {
    if (!options.file && !options.input && !options.benchmarkAll) {
      log(
        LOG_LEVEL.ERROR,
        "You must specify either a file, input, or benchmark all",
      );
      command.help();
    }
  });

program.parse();

const options = program.opts();

if (options.benchmarkAll) {
  log(LOG_LEVEL.INFO, "Benchmarking all algorithms");
  bench(algorithms);
} else if (options.benchmark) {
  log(LOG_LEVEL.INFO, `Benchmarking algorithm: ${options.algorithm}`);
  bench([options.algorithm]);
}

const sorted = sort(options.algorithm, options.file || options.input);

if (options.output) {
  fs.writeFileSync(options.output, sorted.join("\n"));
}
