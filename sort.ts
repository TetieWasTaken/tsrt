import fs from "fs";
import log from "./log";
import { LOG_LEVEL } from "./constants";
import { hrtime } from "node:process";
import { findAlgorithm } from "./helpers";

/**
 * Get the data from the specified file
 * @param file the path to the file
 * @returns the file contents
 */
function getData(file: string): string {
  log(LOG_LEVEL.DEBUG, `Getting data from file: ${file}`);
  try {
    fs.accessSync(file, fs.constants.R_OK);
  } catch (e) {
    log(LOG_LEVEL.ERROR, `Could not read file: ${file}`);
    process.exit(1);
  }

  try {
    return fs.readFileSync(file, "utf-8");
  } catch (e) {
    log(LOG_LEVEL.ERROR, `Could not read file: ${file}`);
    process.exit(1);
  }
}

/**
 * Sort the file using the specified algorithm
 * @param algorithm the algorithm to use
 * @param file the path to the file to sort
 * @returns the sorted file
 */
export default function sort(algorithm: string, file: string): string[] {
  // get file contents
  const data: string = getData(file);

  // parse the data into an array of numbers
  const arr: number[] = data.split("\n").map((line: string) =>
    parseInt(line, 10)
  );

  log(LOG_LEVEL.INFO, `Sorting ${arr.length} elements`);

  const startPerf = hrtime.bigint();
  const sorted: number[] = findAlgorithm(algorithm)(arr);
  const endPerf = hrtime.bigint() - startPerf;

  log(
    LOG_LEVEL.INFO,
    `Sorted ${arr.length} elements in ${Number(endPerf) / 1e6}ms`,
  );

  return sorted.map((num: number) => num.toString());
}
