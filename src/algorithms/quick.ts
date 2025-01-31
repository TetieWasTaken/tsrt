import { compare } from "../helpers";
import { type Algorithm, Complexity, MemoryUsage } from "./types";

/**
 * Partition the array around the pivot element
 * @param arr the array to partition
 * @param start the start index (default is 0)
 * @param end the end index (default is arr.length - 1)
 * @returns {number} the index of the pivot element
 */
function partition<T extends string | number>(
  arr: T[],
  start: number,
  end: number,
): number {
  const pivot = arr[end];
  let i = start - 1;

  for (let j = start; j < end; j++) {
    if (compare(arr[j], pivot) < 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];

  return i + 1;
}

/**
 * Sort by partitioning the array around a pivot element
 * @param arr the array to sort
 * @param start the start index
 * @param end the end index
 * @returns {T[]} the sorted array
 */
export default function quickSort<T extends string | number>(
  arr: T[],
  start: number = 0,
  end: number = arr.length - 1,
): T[] {
  if (arr.length === 0) {
    return arr;
  }

  if (start < end) {
    const pivotIndex = partition(arr, start, end);
    quickSort(arr, start, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, end);
  }

  return arr;
}

export const algorithmData: Algorithm = {
  name: "Quicksort",
  complexity: Complexity.LINEARITHMIC,
  memoryUsage: MemoryUsage.LOGARITHMIC,
  stable: false,
  inPlace: true,
  description:
    "Quicksort is a divide-and-conquer algorithm that selects a 'pivot' element and partitions the array into subarrays of elements less than and greater than the pivot, then recursively sorts the subarrays.",
};
