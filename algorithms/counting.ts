/**
 * Sort by counting the number of occurrences of each element
 * @param arr - the array of numbers to be sorted.
 * @returns the sorted array.
 */
export default function countingSort(arr: number[]): number[] {
  const max = Math.max(...arr);
  const count = Array(max + 1).fill(0);
  const sorted: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }

  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      sorted.push(i);
      count[i]--;
    }
  }

  return sorted;
}
