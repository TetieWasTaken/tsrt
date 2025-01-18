import { compare } from "../helpers";

/**
 * Sort by comparing elements that are a certain distance apart and then reducing the distance
 * @param arr the array to sort
 * @returns {(number[] | string[])} the sorted array
 */
export default function shellSort(
  arr: (number | string)[],
): (number | string)[] {
  let gap = Math.floor(arr.length / 2);

  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      const temp = arr[i];
      let j = i;

      while (j >= gap && compare(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = temp;
    }

    gap = Math.floor(gap / 2);
  }

  return arr;
}
