import fs from "fs";

/**
 * Get a list of available algorithms
 * @returns list of available algorithms
 */
export function getAlgorithms(): string[] {
  const files: string[] = fs.readdirSync("./algorithms");
  return files.map((file: string) => file.split(".")[0]);
}
