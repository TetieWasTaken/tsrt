import { Command, Option } from "commander";
import { getAlgorithms } from "./helpers";
const program = new Command();

program
  .version("0.0.1", "-v, --version", "output the current version")
  .addOption(
    new Option("-a, --algorithm <algorithm>").choices(getAlgorithms()),
  );

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));
