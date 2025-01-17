import insertionSort from "./insertion";

/**
 * Merge two sorted arrays
 * @param arr the array to sort
 * @param start the start index
 * @param mid the middle index
 * @param end the end index
 */
function merge(arr: number[], start: number, mid: number, end: number): void {
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
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
 * Sort by diving the input into blocks and sorting them using insertion sort
 * @param arr array of numbers to be sorted
 * @returns sorted array
 */
export default function blockSort(arr: number[]): number[] {
  const blockSize = Math.floor(Math.sqrt(arr.length));

  for (let i = 0; i < arr.length; i += blockSize) {
    const end = Math.min(i + blockSize - 1, arr.length - 1);
    insertionSort(arr, i, end);
  }

  let currentBlockSize = blockSize;
  while (currentBlockSize < arr.length) {
    for (let start = 0; start < arr.length; start += 2 * currentBlockSize) {
      const mid = Math.min(start + currentBlockSize - 1, arr.length - 1);
      const end = Math.min(start + 2 * currentBlockSize - 1, arr.length - 1);
      if (mid < end) {
        merge(arr, start, mid, end);
      }
    }
    currentBlockSize *= 2;
  }

  return arr;
}
