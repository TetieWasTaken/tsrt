/**
 * Sort by comparing adjacent elements and swapping them if they are in the wrong order.
 * @param arr array of numbers to be sorted
 * @returns sorted array
 */
export default function bubbleSort(arr: number[]): number[] {
  let n = arr.length;

  // repeat until no swaps are made
  do {
    let newN = 0;

    // loop through the array and swap elements if they are in the wrong order
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        newN = i + 1;
      }
    }

    // set the new length of the array to the last swap index
    n = newN;
  } while (n > 0);

  return arr;
}
