import { test } from "node:test";
import assert from "node:assert";
import { execSync } from "child_process";
import * as fs from "node:fs";
import path from "path";
import { getAlgorithms } from "./src/helpers";

const cliPath = path.resolve("./cli.ts");

test("CLI: --version flag", () => {
  console.log(`npx tsx ${cliPath} --version`);
  const output = execSync(`npx tsx ${cliPath} --version`, { encoding: "utf8" });
  assert.match(
    output,
    /^0\.1\.0/,
    "Version output should match expected format",
  );
});

test("CLI: missing required options", () => {
  console.log(`npx tsx ${cliPath}`);
  const output = execSync(`npx tsx ${cliPath}`, {
    encoding: "utf8",
    stdio: "pipe",
  });

  assert.match(
    output,
    /You must specify either a file, input, or a benchmark option/,
    "Error message should match expected output",
  );
});

test("CLI: sorting with input option", () => {
  console.log(`npx tsx ${cliPath} --algorithm quick --input "3,1,2" -p`);
  const output = execSync(
    `npx tsx ${cliPath} --algorithm quick --input "3,1,2" -p`,
    { encoding: "utf8" },
  );
  assert.match(
    output,
    /1,2,3/,
    "Should sort the input correctly",
  );
});

test("CLI: sorting with file option", () => {
  const inputFilePath = "./test_input.txt";
  const outputFilePath = "./test_output.txt";
  fs.writeFileSync(inputFilePath, "3\n1\n2");
  try {
    console.log(
      `npx tsx ${cliPath} --algorithm quick --file ${inputFilePath} --output ${outputFilePath} -p`,
    );
    execSync(
      `npx tsx ${cliPath} --algorithm quick --file ${inputFilePath} --output ${outputFilePath} -p`,
    );
    const output = fs.readFileSync(outputFilePath, "utf8").trim();
    assert.strictEqual(
      output,
      "1,2,3",
      "Should sort file contents correctly",
    );
  } finally {
    fs.unlinkSync(inputFilePath);
    fs.unlinkSync(outputFilePath);
  }
});

test("CLI: invalid algorithm", () => {
  try {
    console.log(`npx tsx ${cliPath} --algorithm invalid --input "1,2,3"`);
    execSync(`npx tsx ${cliPath} --algorithm invalid --input "1,2,3"`, {
      encoding: "utf8",
      stdio: "pipe",
    });
    assert.fail("Expected error for invalid algorithm");
  } catch (error) {
    assert.match(
      error.stderr,
      /^error: option '-a, --algorithm <algorithm>' argument 'invalid' is invalid/,
      "Error message should match expected output",
    );
  }
});

test("CLI: conflicting options", () => {
  try {
    console.log(`npx tsx ${cliPath} --file input.txt --input "1,2,3"`);
    execSync(`npx tsx ${cliPath} --file input.txt --input "1,2,3"`, {
      encoding: "utf8",
      stdio: "pipe",
    });
    assert.fail("Expected error for conflicting options");
  } catch (error) {
    assert.match(
      error.stderr,
      /error: option '-f, --file <file>' cannot be used with option '-i, --input <input>'\n/,
      "Error message should indicate conflicting options",
    );
  }
});

test("CLI: correct sort output mixed", () => {
  // Loop through every algorithm in getAlgorithms() and check if the output is sorted by comparing it to sorted_mixed.txt
  const algorithms = getAlgorithms(true);

  const expected = fs.readFileSync("./examples/mixed/mixed_sorted.txt", "utf-8")
    .trim();

  for (const algorithm of algorithms) {
    console.log(
      `npx tsx ${cliPath} --algorithm ${algorithm} -f ./examples/mixed/mixed_unsorted.txt -o ./output.txt`,
    );
    execSync(
      `npx tsx ${cliPath} --algorithm ${algorithm} -f ./examples/mixed/mixed_unsorted.txt -o ./output.txt`,
      { encoding: "utf8" },
    );
    const actual = fs.readFileSync("output.txt", "utf-8").trim();
    assert.strictEqual(
      actual,
      expected,
      `Output should be sorted for algorithm: ${algorithm}`,
    );

    fs.unlinkSync("output.txt");
  }
});

test("CLI: correct sort output 100k", () => {
  // Loop through every algorithm in getAlgorithms() and check if the output is sorted by comparing it to sorted.txt
  const algorithms = getAlgorithms(true);

  const expected = fs.readFileSync("./examples/100k/100k_sorted.txt", "utf-8")
    .trim();

  for (const algorithm of algorithms) {
    console.log(
      `npx tsx ${cliPath} --algorithm ${algorithm} -f ./examples/100k/100k_unsorted.txt -o ./output.txt`,
    );
    execSync(
      `npx tsx ${cliPath} --algorithm ${algorithm} -f ./examples/100k/100k_unsorted.txt -o ./output.txt`,
      { encoding: "utf8" },
    );
    const actual = fs.readFileSync("output.txt", "utf-8").trim();
    assert.strictEqual(
      actual,
      expected,
      `Output should be sorted for algorithm: ${algorithm}`,
    );

    fs.unlinkSync("output.txt");
  }
});

test("CLI: correct sort output strings", () => {
  // Loop through every algorithm in getAlgorithms() and check if the output is sorted by comparing it to sorted_strings.txt
  const algorithms = getAlgorithms(true);

  const expected = fs.readFileSync(
    "./examples/strings/string_sorted.txt",
    "utf-8",
  )
    .trim();

  for (const algorithm of algorithms) {
    console.log(
      `npx tsx ${cliPath} --algorithm ${algorithm} -f ./examples/strings/string_unsorted.txt -o ./output.txt`,
    );
    execSync(
      `npx tsx ${cliPath} --algorithm ${algorithm} -f ./examples/strings/string_unsorted.txt -o ./output.txt`,
      { encoding: "utf8" },
    );
    const actual = fs.readFileSync("output.txt", "utf-8").trim();
    assert.strictEqual(
      actual,
      expected,
      `Output should be sorted for algorithm: ${algorithm}`,
    );

    fs.unlinkSync("output.txt");
  }
});
