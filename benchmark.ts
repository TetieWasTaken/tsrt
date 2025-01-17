import { findAlgorithm, getRandoms } from "./helpers";
import { hrtime } from "node:process";

export function bench(algorithms: string[]) {
  const randoms = getRandoms(10000);

  const results = algorithms.map((algorithm) => {
    const sort = findAlgorithm(algorithm);
    let totalTime = [0, 0];

    for (let i = 0; i < 5; i++) {
      const start = hrtime();
      sort([...randoms]); // Use a copy of the array to ensure consistency
      const end = hrtime(start);
      totalTime[0] += end[0];
      totalTime[1] += end[1];
    }

    const averageTime = [totalTime[0] / 5, totalTime[1] / 5];
    return {
      algorithm,
      seconds: averageTime[0],
      nanoseconds: averageTime[1],
    };
  });

  console.table(results);
}
