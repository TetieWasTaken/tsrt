import { log } from "console";
import { LOG_LEVEL } from "../constants";
import quickSort from "./quick";
import { exit } from "process";

/**
 * Sort by distributing elements into buckets based on their digits
 * @param arr the array to sort
 * @returns {Array<number | string>} the sorted array
 */
export default function radixSort(
  arr: Array<number | string>,
): Array<number | string> {
  if (arr.length === 0) return arr;
  if (arr.length > 120000) {
    log(
      LOG_LEVEL.ERROR,
      "Array too large for radix sort. Please use quick sort or reduce the size of the array.",
      false,
    );
    exit(1);
  }

  // separate numbers and strings
  const numbers = arr.filter((item) => typeof item === "number") as number[];
  const strings = arr.filter((item) => typeof item === "string") as string[];

  if (numbers.length > 0) {
    const max = Math.max(...numbers);
    const maxDigits = Math.floor(Math.log10(max)) + 1;

    for (let i = 0; i < maxDigits; i++) {
      const buckets: number[][] = Array.from({ length: 10 }, () => []);

      for (let j = 0; j < numbers.length; j++) {
        const num = numbers[j];
        const digit = Math.floor(num / 10 ** i) % 10;
        buckets[digit].push(num);
      }

      numbers.length = 0;
      for (const bucket of buckets) {
        numbers.push(...bucket);
      }
    }
  }

  if (strings.length > 0) {
    const maxLength = Math.max(...strings.map((str) => str.length));

    for (let i = maxLength - 1; i >= 0; i--) {
      const buckets: string[][] = Array.from({ length: 256 }, () => []);

      for (let j = 0; j < strings.length; j++) {
        const str = strings[j];
        const charCode = i < str.length ? str.charCodeAt(i) : 0;
        buckets[charCode].push(str);
      }

      strings.length = 0;
      for (const bucket of buckets) {
        strings.push(...bucket);
      }
    }
  }

  return [...numbers, ...strings];
}
