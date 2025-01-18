import { Command, Option } from "@commander-js/extra-typings";
import { getAlgorithms } from "./helpers";
import { DEFAULT_ALGORITHM, LOG_LEVEL } from "./constants";
import fs from "fs";
import sort from "./sort";
import log from "./log";
import { bench } from "./benchmark";
import { exit } from "node:process";

const algorithms = getAlgorithms();

const program = new Command()
  .version("0.1.0", "-v, --version", "output the current version")
  .addOption(
    new Option("-a, --algorithm <algorithm>", "the algorithm to use").choices(
      algorithms,
    ).default(
      "none",
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
    new Option(
      "-b, --benchmark",
      "benchmark the selected (-a) algorithm, or all algorithms if none is selected",
    )
      .conflicts(
        ["file", "input", "benchmarkAll"],
      ),
  )
  .addOption(
    new Option(
      "--benchmark-iterations <iterations>",
      "the number of iterations to benchmark",
    ).hideHelp(),
  )
  .addOption(
    new Option(
      "--benchmark-size <size>",
      "the size of the random list to benchmark",
    ).hideHelp(),
  )
  .action((options, command) => {
    if (
      !options.file && !options.input && !options.benchmark
    ) {
      log(
        LOG_LEVEL.ERROR,
        "You must specify either a file, input, or a benchmark option",
      );
      command.help();
    }
  });

try {
  program.parse();
} catch (error) {
  log(LOG_LEVEL.ERROR, error.message);
  exit(1);
}

let options;

try {
  options = program.opts();
} catch (error) {
  log(LOG_LEVEL.ERROR, error.message);
  exit(1);
}

try {
  if (options.benchmark) {
    bench(
      options.algorithm == "none" ? algorithms : [options.algorithm],
      Number(options.benchmarkIterations) || undefined,
      Number(options.benchmarkSize) || undefined,
    );
  } else {
    const algorithm = options.algorithm == "none"
      ? DEFAULT_ALGORITHM
      : options.algorithm;
    const sorted = sort(algorithm, options.file || options.input);

    if (options.output) {
      fs.writeFileSync(options.output, sorted.join("\n"));
    } else {
      console.log(sorted.join("\n"));
    }
  }
} catch (error) {
  log(LOG_LEVEL.ERROR, error.message);
  exit(1);
}
