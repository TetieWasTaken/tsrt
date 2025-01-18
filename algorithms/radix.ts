/**
 * Sort by distributing elements into buckets based on their digits
 * @param arr the array to sort
 * @returns {number[]} the sorted array
 */
export default function radixSort(arr: number[]): number[] {
  if (arr.length === 0) return arr;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  const maxDigits = Math.floor(Math.log10(max)) + 1;

  for (let i = 0; i < maxDigits; i++) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < arr.length; j++) {
      const num = arr[j];
      const digit = Math.floor(num / 10 ** i) % 10;
      buckets[digit].push(num);
    }

    arr = [];
    for (const bucket of buckets) {
      arr = arr.concat(bucket);
    }
  }

  return arr;
}
