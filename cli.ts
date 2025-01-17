import { Command, Option } from "@commander-js/extra-typings";
import { getAlgorithms } from "./helpers";
import { DEFAULT_ALGORITHM } from "./constants";

const program = new Command()
  .version("0.0.1", "-v, --version", "output the current version")
  .addOption(
    new Option("-a, --algorithm <algorithm>").choices(getAlgorithms()).default(
      DEFAULT_ALGORITHM,
    ),
  );

program.parse();

const options = program.opts();
console.log(options.algorithm);
