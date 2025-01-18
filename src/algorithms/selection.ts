/**
 * Sort by finding the minimum element from the unsorted portion and swapping it with the first element
 * @param arr the array to sort
 * @returns {(number[] | string[])} the sorted array
 */
export default function selectionSort<T extends number | string>(
  arr: T[],
): T[] {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}
