import * as fs from "node:fs";
import log from "./log";
import { IGNORED_ALGORITHMS, LOG_LEVEL } from "./constants";
import { exit } from "node:process";
import type { Algorithm } from "./algorithms/types";

/**
 * Get a list of available algorithms
 * @returns list of available algorithms
 */
export function getAlgorithms(plain: boolean): string[] {
  try {
    const files: string[] = fs.readdirSync(__dirname + "/algorithms");
    return files.map((f: string) => f.split(".")[0]).filter((f: string) => {
      if (IGNORED_ALGORITHMS.includes(f)) {
        log(LOG_LEVEL.DEBUG, `Ignoring algorithm: ${f}`, plain);
        return false;
      }
      return true;
    });
  } catch (error) {
    log(
      LOG_LEVEL.ERROR,
      `Could not find algorithms directory: ${error.message}`,
      plain,
    );
    exit(1);
  }
}

export function convertToNumbers(input: string[]): (string | number)[] {
  return input.map((i: string) => {
    if (isNaN(Number(i))) {
      return i;
    }

    return Number(i);
  });
}

/**
 * Get a list of random numbers
 * @param size the size of the list
 * @returns the list of random numbers
 */
export function getRandoms(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

/**
 * Retrieve the algorithm function from the algorithms directory
 * @param algorithm the algorithm name to retrieve
 * @returns the algorithm function
 */
export function findAlgorithm(
  algorithm: string,
  plain: boolean,
): (arr: (number | string)[]) => (number | string)[] {
  log(LOG_LEVEL.DEBUG, `Finding algorithm: ${algorithm}`, plain);

  try {
    // get all files in the algorithms directory
    const files: string[] = fs.readdirSync(__dirname + "/algorithms");

    if (!files.length) {
      log(LOG_LEVEL.ERROR, "No algorithms found", plain);
      exit(1);
    }

    // find which file contains the algorithm
    const file = files.find((f: string) => f.split(".")[0] === algorithm);

    if (!file) {
      log(LOG_LEVEL.ERROR, `Could not find algorithm: ${algorithm}`, plain);
      exit(1);
    }

    log(LOG_LEVEL.DEBUG, `Found algorithm: ${algorithm}`, plain);

    // return the default export of the file
    return require(__dirname + `/algorithms/${file}`).default;
  } catch (error) {
    log(
      LOG_LEVEL.ERROR,
      `Could not find algorithm: ${algorithm} - ${error.message}`,
      plain,
    );
    exit(1);
  }
}

export function getAlgorithmData(): Algorithm[] {
  try {
    const files: string[] = fs.readdirSync(__dirname + "/algorithms");
    return files.map((f: string) => {
      const name = f.split(".")[0];
      if (IGNORED_ALGORITHMS.includes(name)) {
        return null;
      }

      return (require(__dirname + `/algorithms/${f}`).algorithmData);
    }).filter((a: Algorithm | null) => a !== null) as Algorithm[];
  } catch (error) {
    log(
      LOG_LEVEL.ERROR,
      `Failed to get algorithm data - ${error.message}`,
      false,
    );
    exit(1);
  }
}

/**
 * Compare two string/number values
 * @param a value 1
 * @param b value 2
 * @returns -1 if a < b, 0 if a === b, 1 if a > b
 */
export function compare(a: string | number, b: string | number): number {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }
  return typeof a === "number" ? -1 : 1; // numbers come before strings
}
