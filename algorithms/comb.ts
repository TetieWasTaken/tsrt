/**
 * Sort by comparing elements that are a certain distance apart and then reducing the distance
 * @param {number[]} arr - the array of numbers to be sorted.
 * @returns {number[]} - the sorted array.
 */
export default function combSort(arr: number[]): number[] {
  const shrinkFactor = 1.3;
  let gap = arr.length;
  let swapped = true;

  while (gap > 1 || swapped) {
    gap = Math.max(Math.floor(gap / shrinkFactor), 1);
    swapped = false;

    for (let i = 0; i + gap < arr.length; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        swapped = true;
      }
    }
  }

  return arr;
}
