import fs from "fs";
import log from "./log";
import { LOG_LEVEL } from "./constants";
import { hrtime } from "node:process";
import { findAlgorithm } from "./helpers";
import { exit } from "node:process";

/**
 * Get the data from the specified file
 * @param file the path to the file
 * @returns the file contents
 */
function getData(file: string): string {
  log(LOG_LEVEL.DEBUG, `Getting data from file: ${file}`);
  try {
    fs.accessSync(file, fs.constants.R_OK);
  } catch (error) {
    log(LOG_LEVEL.ERROR, `Could not access file: ${file} - ${error.message}`);
    exit(1);
  }

  try {
    return fs.readFileSync(file, "utf-8");
  } catch (error) {
    log(LOG_LEVEL.ERROR, `Could not read file: ${file} - ${error.message}`);
    exit(1);
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

  let sorted: number[] = [];
  const startPerf = hrtime.bigint();
  try {
    sorted = findAlgorithm(algorithm)(arr);
  } catch (error) {
    log(
      LOG_LEVEL.ERROR,
      `Could not run algorithm: ${algorithm} - ${error.message}`,
    );
    exit(1);
  }
  const endPerf = hrtime.bigint() - startPerf;

  log(
    LOG_LEVEL.INFO,
    `Sorted ${arr.length} elements in ${Number(endPerf) / 1e6}ms`,
  );

  return sorted.map((num: number) => num.toString());
}
