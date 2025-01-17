/**
 * Sort by comparing adjacent elements and swapping them if they are in the wrong order.
 * @param arr array of numbers to be sorted
 * @returns sorted array
 */
export default function bubbleSort(arr: number[]): number[] {
  let swapped: boolean;

  // repeat until no swaps are made
  do {
    swapped = false;

    // loop through the array and swap elements if they are in the wrong order
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}
