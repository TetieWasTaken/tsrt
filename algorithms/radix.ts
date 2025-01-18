/**
 * Sort by distributing elements into buckets based on their digits
 * @param arr the array to sort
 * @returns {number[]} the sorted array
 */
export default function radixSort(arr: number[]): number[] {
  const max = Math.max(...arr);
  const maxDigits = max.toString().length;

  for (let i = 0; i < maxDigits; i++) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < arr.length; j++) {
      const num = arr[j];
      const digit = Math.floor(num / 10 ** i) % 10;
      buckets[digit].push(num);
    }

    arr = buckets.flat();
  }

  return arr;
}
