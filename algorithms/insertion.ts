/**
 * Sorts by comparisons between elements before the current element
 * @param arr
 * @param start
 * @param end
 * @returns the sorted array
 */
export default function insertionSort(
  arr: number[],
  start: number = 0,
  end: number = arr.length - 1,
): number[] {
  for (let i = start + 1; i <= end; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= start && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }

  return arr;
}
