/**
 * Sorts by comparisons between elements before the current element
 * @param arr the array to sort
 * @param start the start index of the array
 * @param end the end index of the array
 * @param compareFunction the function to compare elements
 * @returns the sorted array
 */
export default function insertionSort<T extends number | string>(
  arr: T[],
  start: number = 0,
  end: number = arr.length - 1,
  compareFunction: (a: T, b: T) => number = (
    a,
    b,
  ) => (a > b ? 1 : a < b ? -1 : 0),
): T[] {
  for (let i = start + 1; i <= end; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= start && compareFunction(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }

  return arr;
}
