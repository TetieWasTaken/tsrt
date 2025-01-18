/**
 * Sort by counting the number of occurrences of each element
 * @param arr - the array of numbers to be sorted.
 * @returns the sorted array.
 */
export default function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  const count = Array(max + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }

  const sorted: number[] = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      sorted.push(i);
      count[i]--;
    }
  }

  return sorted;
}
