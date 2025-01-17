import fs from "fs";
import log from "./log";
import { LOG_LEVEL } from "./constants";

/**
 * Get a list of available algorithms
 * @returns list of available algorithms
 */
export function getAlgorithms(): string[] {
  const files: string[] = fs.readdirSync("./algorithms");
  return files.map((file: string) => file.split(".")[0]);
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
export function findAlgorithm(algorithm: string): Function {
  log(LOG_LEVEL.DEBUG, `Finding algorithm: ${algorithm}`);

  const files: string[] = fs.readdirSync("./algorithms");
  // find which file contains the algorithm
  const file = files.find((f: string) => f.split(".")[0] === algorithm);

  if (!file) {
    log(LOG_LEVEL.ERROR, `Could not find algorithm: ${algorithm}`);
    process.exit(1);
  }

  log(LOG_LEVEL.DEBUG, `Found algorithm: ${algorithm}`);

  return require(`./algorithms/${file}`).default;
}
