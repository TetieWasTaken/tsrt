import { findAlgorithm, getRandoms } from "./helpers";
import { hrtime } from "node:process";
import log from "./log";
import { LOG_LEVEL } from "./constants";
import readline from "readline";
import { stdout } from "node:process";

function updateProgressBar(
  algorithm: string,
  iteration: number,
  totalIterations: number,
  totalAlgorithms: number,
  currentAlgorithm: number,
) {
  const barLength = 40;
  const filledLength = Math.round((barLength * iteration) / totalIterations);
  const bar = "\x1b[32m█".repeat(filledLength) +
    "\x1b[0m-".repeat(barLength - filledLength);

  readline.cursorTo(stdout, 0);
  stdout.clearLine(0);
  stdout.write(
    `\x1b[36mAlgorithm: ${algorithm}\x1b[0m (${currentAlgorithm}/${totalAlgorithms}) | \x1b[33mIteration: ${iteration}/${totalIterations}\x1b[0m | Progress: [${bar}\x1b[0m]`,
  );
}

export function bench(
  algorithms: string[],
  iterations: number = 15,
  size: number = 10000,
  plain: boolean = false,
) {
  // todo: also iterate through different random lists, as another iteration
  const randoms = getRandoms(size);

  log(
    LOG_LEVEL.INFO,
    `Benchmarking ${
      algorithms.join(", ")
    } with ${size} elements and ${iterations} iterations`,
    plain,
  );

  const results = algorithms.map((algorithm) => {
    const sort = findAlgorithm(algorithm, plain);

    let totalTime = 0n;
    let minTime = BigInt(Number.MAX_SAFE_INTEGER);
    let maxTime = 0n;
    const times: bigint[] = [];

    for (let i = 0; i < iterations; i++) {
      updateProgressBar(
        algorithm,
        i + 1,
        iterations,
        algorithms.length,
        algorithms.indexOf(algorithm) + 1,
      );
      const start = hrtime.bigint();
      sort([...randoms]);
      const end = hrtime.bigint();
      const iterationTime = end - start;
      times.push(iterationTime);
      totalTime += iterationTime;
      if (iterationTime < minTime) minTime = iterationTime;
      if (iterationTime > maxTime) maxTime = iterationTime;
      log(
        LOG_LEVEL.DEBUG,
        `Iteration ${i + 1} took ${Number(iterationTime) / 1e6}ms`,
        plain,
      );
    }

    const averageTime = Number(totalTime) / (1e6 * iterations);
    const minTimeMs = Number(minTime) / 1e6;
    const maxTimeMs = Number(maxTime) / 1e6;

    // median
    times.sort((a, b) => Number(a - b));
    const medianTime = times.length % 2 === 0
      ? (Number(
        times[times.length / 2 - 1] + BigInt(Number(times[times.length / 2])),
      ) /
        2) / 1e6
      : Number(times[Math.floor(times.length / 2)]) / 1e6;

    // variance/std deviation
    const meanTime = Number(totalTime) / iterations;
    const variance = times.reduce((acc, time) =>
      acc + (Number(time) - meanTime) ** 2, 0) / iterations;
    const stdDeviation = Math.sqrt(variance) / 1e6;

    return {
      algorithm,
      averageTime,
      minTime: minTimeMs,
      maxTime: maxTimeMs,
      medianTime,
      stdDeviation,
    };
  });

  // sort by average time
  results.sort((a, b) => a.averageTime - b.averageTime);

  // clear progress bar
  readline.cursorTo(stdout, 0);
  stdout.clearLine(0);

  console.table(results.map((result) => ({
    Algorithm: result.algorithm,
    "Average (ms)": result.averageTime.toPrecision(5),
    "Min (ms)": result.minTime.toPrecision(5),
    "Max (ms)": result.maxTime.toPrecision(5),
    "Median (ms)": result.medianTime.toPrecision(5),
    "Std Dev (ms)": result.stdDeviation.toPrecision(5),
    "Range (ms)": (result.maxTime - result.minTime).toPrecision(5),
  })));
}
