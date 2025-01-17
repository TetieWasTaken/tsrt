import { Command, Option } from "@commander-js/extra-typings";
import { getAlgorithms } from "./helpers";
import { DEFAULT_ALGORITHM } from "./constants";
import fs from "fs";
import sort from "./sort";

const program = new Command()
  .version("0.0.1", "-v, --version", "output the current version")
  .addOption(
    new Option("-a, --algorithm <algorithm>", "the algorithm to use").choices(
      getAlgorithms(),
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
  .action((options, command) => {
    if (!options.file && !options.input) {
      command.help();
    }
  });

program.parse();

const options = program.opts();
console.log(options);
const sorted = sort(options.algorithm, options.file || options.input);
console.log(sorted);

if (options.output) {
  fs.writeFileSync(options.output, sorted.join("\n"));
}
