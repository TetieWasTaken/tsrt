export enum Complexity {
  LOGARITHMIC = "O(log n)",
  LINEAR = "O(n)",
  LINEARITHMIC = "O(n log n)",
  QUADRATIC = "O(n^2)",
  FOUR_THIRDS = "O(n^(4/3))",
}

export enum MemoryUsage {
  CONSTANT = "O(1)",
  LOGARITHMIC = "O(log n)",
  LINEAR = "O(n)",
}

export interface Algorithm {
  name: string;
  complexity: Complexity;
  memoryUsage: MemoryUsage;
  stable: boolean;
  inPlace: boolean;
  description: string;
}
