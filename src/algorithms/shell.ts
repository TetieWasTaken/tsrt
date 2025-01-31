import { compare } from "../helpers";
import { type Algorithm, Complexity, MemoryUsage } from "./types";

/**
 * Sort by comparing elements that are a certain distance apart and then reducing the distance
 * @param arr the array to sort
 * @returns {(number[] | string[])} the sorted array
 */
export default function shellSort(
  arr: (number | string)[],
): (number | string)[] {
  let gap = Math.floor(arr.length / 2);

  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      const temp = arr[i];
      let j = i;

      while (j >= gap && compare(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = temp;
    }

    gap = Math.floor(gap / 2);
  }

  return arr;
}

export const algorithmData: Algorithm = {
  name: "Shellsort",
  complexity: Complexity.FOUR_THIRDS,
  memoryUsage: MemoryUsage.CONSTANT,
  stable: false,
  inPlace: true,
  description:
    "Shellsort is an in-place comparison-based algorithm that sorts the elements by comparing elements that are a certain distance apart and then reducing the distance. (measuring actual complexity is difficult, may not be accurate)",
};
