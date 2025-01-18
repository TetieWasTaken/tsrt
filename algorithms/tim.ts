import mergeSort, { merge } from "./merge.ts";

/**
 * Find runs in the array
 * @param arr the array to find runs in
 * @returns {number[][]} the runs in the array
 */
function findRuns(arr: number[]): number[][] {
  const runs: number[][] = [];
  let start = 0;
  let end = 1;

  while (end < arr.length) {
    if (arr[end] < arr[end - 1]) {
      runs.push(arr.slice(start, end));
      start = end;
    }
    end++;
  }

  runs.push(arr.slice(start, end));
  return runs;
}

/**
 * Sort a run using insertion sort
 * @param runs the run to sort
 * @returns {number[]} the sorted run
 */
function mergeRuns(runs: number[][]): number[] {
  while (runs.length > 1) {
    const left = runs.shift() as number[];
    const right = runs.shift() as number[];
    runs.push(merge(left, right));
  }

  return runs[0];
}

/**
 * Sort by dividing the input into runs, sorting them using insertion sort, and then merging them using the merge sort algorithm
 * @param arr the array to sort
 * @returns {number[]} the sorted array
 */
export default function timSort(arr: number[]): number[] {
  const minRun = 32;

  const runs = findRuns(arr);
  const sortedRuns = runs.map((run: number[]) => mergeSort(run, minRun));
  return mergeRuns(sortedRuns);
}
