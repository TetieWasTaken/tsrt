import fs from "fs";

/**
 * Retrieve the algorithm function from the algorithms directory
 * @param algorithm the algorithm name to retrieve
 * @returns the algorithm function
 */
function findAlgorithm(algorithm: string): Function {
  const files: string[] = fs.readdirSync("./algorithms");
  // find which file contains the algorithm
  const file = files.find((f: string) => f.split(".")[0] === algorithm);

  if (!file) {
    throw new Error(`Algorithm not found: ${algorithm}`);
  }

  return require(`./algorithms/${file}`).default;
}

/**
 * Get the data from the specified file
 * @param file the path to the file
 * @returns the file contents
 */
function getData(file: string): string {
  return fs.readFileSync(file, "utf-8");
}

/**
 * Sort the file using the specified algorithm
 * @param algorithm the algorithm to use
 * @param file the path to the file to sort
 * @returns the sorted file
 */
export default function sort(algorithm: string, file: string): string {
  // get file contents
  const data: string = getData(file);

  // parse the data into an array of numbers
  const arr: number[] = data.split("\n").map((line: string) =>
    parseInt(line, 10)
  );

  const sorted: number[] = findAlgorithm(algorithm)(arr);
  return sorted.join("\n");
}
