/**
 * Merge two sorted arrays
 * @param left the left array
 * @param right the right array
 * @returns the merged array
 */
export function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
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
 * Sort an array by recursively splitting it into two halves, sorting the halves, and merging
 * @param arr the array to sort
 * @returns the sorted array
 */
export default function mergeSort(arr: number[], minRun: number = 1): number[] {
  if (arr.length <= minRun) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), minRun);
  const right = mergeSort(arr.slice(mid), minRun);

  return merge(left, right);
}
