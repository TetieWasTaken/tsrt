import { compare } from "../helpers";
import { type Algorithm, Complexity, MemoryUsage } from "./types";

/**
 * Heapify a subtree rooted with node i which is an index in arr[].
 * @param arr - the array to heapify
 * @param n - the size of the heap
 * @param i - the index of the root node
 */
function heapify<T extends string | number>(
  arr: T[],
  n: number,
  i: number,
) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && compare(arr[left], arr[largest]) > 0) {
    largest = left;
  }

  if (right < n && compare(arr[right], arr[largest]) > 0) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

/**
 * Sort by using the heap sort algorithm; it builds a max heap from the input, then repeatedly extracts the maximum element from the heap and places it at the end of the array.
 * @param arr - the array of elements to sort.
 * @returns the sorted array.
 */
export default function heapSort<T extends string | number>(
  arr: T[],
): T[] {
  const n: number = arr.length;

  // build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}

export const algorithmData: Algorithm = {
  name: "Heap sort",
  complexity: Complexity.LINEARITHMIC,
  memoryUsage: MemoryUsage.CONSTANT,
  stable: false,
  inPlace: true,
  description:
    "Heap Sort is a comparison-based sorting algorithm that builds a heap from the input data and repeatedly extracts the maximum element to place at the end.",
};
