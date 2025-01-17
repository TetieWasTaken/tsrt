import { Command, Option } from "@commander-js/extra-typings";
import { getAlgorithms } from "./helpers";
import { DEFAULT_ALGORITHM } from "./constants";
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
  .argument("<file>", "the file to sort");

program.parse();

const options = program.opts();
console.log(sort(options.algorithm, program.args[0]));
