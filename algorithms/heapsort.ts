/**
 * Heapify a subtree rooted with node i which is an index in arr[]. n is size of heap
 * @param arr the array to heapify
 * @param n the size of the heap
 * @param i the index of the root node
 */
function heapify(arr: number[], n: number, i: number) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

/**
 * Sort by creating a max heap and repeatedly extracting the maximum element from the heap
 * @param arr the array to sort
 * @returns the sorted array
 */
export default function heapSort(arr: number[]): number[] {
  const n: number = arr.length;

  // build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}
