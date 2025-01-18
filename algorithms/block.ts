import { compare } from "../helpers";
import insertionSort from "./insertion";

/**
 * Merge function for block sort
 * @param arr array of elements to be merged
 * @param start the start index
 * @param mid the middle index
 * @param end the ending index of the subarray to be merged
 */
function merge<T extends string | number>(
  arr: T[],
  start: number,
  mid: number,
  end: number,
): void {
  const left = arr.slice(start, mid + 1);
  const right = mid < end ? arr.slice(mid + 1, end + 1) : [];
  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
  }

  while (i < left.length) {
    arr[k++] = left[i++];
  }

  while (j < right.length) {
    arr[k++] = right[j++];
  }
}

/**
 * Sort by dividing the input into blocks, sorting them using insertion sort, and then merging them using the merge sort algorithm
 * @param arr array of elements to be sorted
 * @returns {T[]} the sorted array
 */
export default function blockSort<T extends string | number>(arr: T[]): T[] {
  const blockSize = Math.floor(Math.sqrt(arr.length));

  for (let i = 0; i < arr.length; i += blockSize) {
    insertionSort(
      arr,
      i,
      Math.min(i + blockSize - 1, arr.length - 1),
      compare,
    );
  }

  let currentBlockSize = blockSize;
  while (currentBlockSize < arr.length) {
    for (
      let start = 0;
      start + currentBlockSize < arr.length;
      start += 2 * currentBlockSize
    ) {
      const mid = start + currentBlockSize - 1;
      const end = Math.min(start + 2 * currentBlockSize - 1, arr.length - 1);
      merge(arr, start, mid, end);
    }
    currentBlockSize *= 2;
  }

  return arr;
}
