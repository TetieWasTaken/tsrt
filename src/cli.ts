import { Command, Option } from "@commander-js/extra-typings";
import { convertToNumbers, getAlgorithms } from "./helpers";
import { DEFAULT_ALGORITHM, LOG_LEVEL } from "./constants";
import * as fs from "node:fs";
import sort, { getData } from "./sort";
import log from "./log";
import { bench } from "./benchmark";
import { exit } from "node:process";

const algorithms = getAlgorithms(false);

const program = new Command()
  .version("1.0.5", "-v, --version", "output the current version")
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
  .addOption(
    new Option(
      "-p, --plain",
      "do not use formatting for output",
    ).hideHelp().default(false),
  )
  .action((options, command) => {
    if (
      !options.file && !options.input && !options.benchmark
    ) {
      command.help();
    }
  });

try {
  program.parse();
} catch (error) {
  log(LOG_LEVEL.ERROR, error.message, false);
  exit(1);
}

let options: ReturnType<typeof program.opts>;

try {
  options = program.opts();
} catch (error) {
  log(LOG_LEVEL.ERROR, error.message, false);
  exit(1);
}

try {
  if (options.benchmark) {
    bench(
      options.algorithm == "none" ? algorithms : [options.algorithm],
      Number(options.benchmarkIterations) || undefined,
      Number(options.benchmarkSize) || undefined,
      options.plain,
    );
  } else {
    const algorithm = options.algorithm == "none"
      ? DEFAULT_ALGORITHM
      : options.algorithm;

    let input: string[] | undefined;
    if (options.file) {
      input = getData(options.file, options.plain);
    } else if (options.input) {
      if (options.input.includes(",")) {
        input = options.input.split(",");
      } else {
        log(LOG_LEVEL.ERROR, "Unsupported input format", options.plain);
        exit(1);
      }
    }

    if (!input) {
      log(
        LOG_LEVEL.ERROR,
        "Could not get input data",
        options.plain,
      );
      exit(1);
    }

    const convertedInput = convertToNumbers(input);
    const sorted = sort(algorithm, convertedInput, options.plain);

    if (options.output) {
      log(
        LOG_LEVEL.INFO,
        `Storing result in ${options.output}...`,
        options.plain,
      );
      fs.writeFileSync(
        options.output,
        options.plain ? sorted.join(",") : sorted.join("\n"),
      );
    } else {
      options.plain
        ? console.log(sorted.join(","))
        : console.log(sorted.join("\n"));
    }
  }
} catch (error) {
  log(LOG_LEVEL.ERROR, error.message, options.plain);
  exit(1);
}
