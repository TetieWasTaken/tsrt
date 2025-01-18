import insertionSort from "./insertion";

/**
 * @param arr array of numbers to be merged
 * @param start the start index
 * @param mid the middle index
 * @param end the ending index of the subarray to be merged
 */
function merge(arr: number[], start: number, mid: number, end: number): void {
  const left = arr.slice(start, mid + 1);
  const right = mid < end ? arr.slice(mid + 1, end + 1) : [];
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
 * Sort by dividing the input into blocks, sorting them using insertion sort, and then merging them using the merge sort algorithm
 * @param arr array of numbers to be sorted
 * @returns {number[]} the sorted array
 */
export default function blockSort(arr: number[]): number[] {
  const blockSize = Math.floor(Math.sqrt(arr.length));

  for (let i = 0; i < arr.length; i += blockSize) {
    insertionSort(arr.slice(i, Math.min(i + blockSize, arr.length)));
    insertionSort(arr, i, Math.min(i + blockSize - 1, arr.length - 1));
  }

  let currentBlockSize = blockSize;
  while (currentBlockSize < arr.length) {
    for (let start = 0; start < arr.length - 1; start += 2 * currentBlockSize) {
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
