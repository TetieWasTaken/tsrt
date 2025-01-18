import { compare } from "../helpers";
import { type Algorithm, Complexity, MemoryUsage } from "./types";

/**
 * Merge two sorted arrays
 * @param left the left array
 * @param right the right array
 * @returns the merged array
 */
export function merge<T extends string | number>(left: T[], right: T[]): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Use the custom compare function
  while (leftIndex < left.length && rightIndex < right.length) {
    if (compare(left[leftIndex], right[rightIndex]) < 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}

/**
 * Sort an array by recursively splitting it into two halves, sorting the halves, and merging them.
 * @param arr the array to sort
 * @returns the sorted array
 */
export default function mergeSort<T extends string | number>(
  arr: T[],
  minRun: number = 1,
): T[] {
  if (arr.length <= minRun) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), minRun);
  const right = mergeSort(arr.slice(mid), minRun);

  return merge(left, right);
}

export const algorithmData: Algorithm = {
  name: "Merge sort",
  complexity: Complexity.LINEARITHMIC,
  memoryUsage: MemoryUsage.LINEAR,
  stable: true,
  inPlace: false,
  description:
    "Merge Sort is a divide-and-conquer algorithm that recursively splits the array into halves, sorts each half, and then merges the sorted halves.",
};
