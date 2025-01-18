import { compare } from "../helpers";
import { type Algorithm, Complexity, MemoryUsage } from "./types";

/**
 * Sort by comparing elements that are a certain distance apart and then reducing the distance
 * @param {(number|string)[]} arr - the array of numbers or strings to be sorted.
 * @returns {(number|string)[]} - the sorted array.
 */
export default function combSort(
  arr: (number | string)[],
): (number | string)[] {
  const shrinkFactor = 1.3;
  let gap = arr.length;
  let swapped = true;

  while (gap > 1 || swapped) {
    gap = Math.max(Math.floor(gap / shrinkFactor), 1);
    swapped = false;

    for (let i = 0; i + gap < arr.length; i++) {
      if (compare(arr[i], arr[i + gap]) > 0) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        swapped = true;
      }
    }
  }

  return arr;
}

export const algorithmData: Algorithm = {
  name: "Comb sort",
  complexity: Complexity.QUADRATIC,
  memoryUsage: MemoryUsage.LINEAR,
  stable: false,
  inPlace: true,
  description:
    "Comb sort is an improved bubble sort algorithm that allows far-away elements to move faster towards their expected positions.",
};
