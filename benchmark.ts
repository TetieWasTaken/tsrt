import { findAlgorithm, getRandoms } from "./helpers";
import { hrtime } from "node:process";
import log from "./log";
import { LOG_LEVEL } from "./constants";

export function bench(
  algorithms: string[],
  iterations: number = 5,
  size: number = 10000,
) {
  const randoms = getRandoms(size);

  log(
    LOG_LEVEL.INFO,
    `Benchmarking ${
      algorithms.join(", ")
    } with ${size} elements and ${iterations} iterations`,
  );

  const results = algorithms.map((algorithm) => {
    log(LOG_LEVEL.INFO, `Benchmarking algorithm: ${algorithm}`);
    const sort = findAlgorithm(algorithm);

    let totalTime = 0n;

    for (let i = 0; i < iterations; i++) {
      const start = hrtime.bigint();
      sort([...randoms]);
      const end = hrtime.bigint();
      totalTime = totalTime + (end - start);
      log(
        LOG_LEVEL.DEBUG,
        `Iteration ${i + 1} took ${Number(end - start) / 1e6}ms`,
      );
    }

    return {
      algorithm,
      milliseconds: Number(totalTime) / (1e6 * iterations),
    };
  });

  // would be funny to sort with the fastest algorithm from the bench
  results.sort((a, b) => a.milliseconds - b.milliseconds);

  console.table(results.map((result) => ({
    Algorithm: result.algorithm,
    "Average (ms)": result.milliseconds,
  })));
}
