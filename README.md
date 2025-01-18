# tsrt
 
`tsrt` is a command line implementation of multiple sorting algorithms in TypeScript.

## Installation

```bash
npm install -g tsrt
# check if the installation was successful
tsrt --version
tsrt -i 3,1,2,5,4
```

Check out the [Examples](#examples) and [Options](#options) sections for more information on how to use `tsrt`.

## Options

| Option               | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `-v, --version`      | Outputs the current version                                                 |
| `-a, --algorithm`    | The algorithm to use for sorting (see `--info` for available algorithms)    |
| `-f, --file`         | A file to read the input from (conflicts with `-i`)                         |
| `-i, --input`        | A comma separated list of elements to sort (conflicts with `-f`)            |
| `-o, --output`       | The file to write the sorted output                                         |
| `-b, --benchmark`    | Benchmark the selected (`-a`) algorithm, or all algorithms if none is selected |
| `--info`             | Output available algorithms                                                 |
###### Additional options for benchmarking can be found in the [Examples/Benchmarking](#benchmarking) section.

## Examples

### General Usage
Directly sorting a comma separated list of elements:

```bash
$ tsrt -i 3,1,2,5,4
```

Sorting with a specific algorithm:

```bash
$ tsrt -i 3,1,2,5,4 -a heap
```

Sorting a file:

```bash
$ tsrt -f path/to/file.txt
```

Outputting to a file:

```bash
$ tsrt -i 3,1,2,5,4 -o path/to/output.txt
```

### Benchmarking
Benchmarking a sorting algorithm:

```bash
$ tsrt -b -a heap
```
##### to benchmark all algorithms, omit the `-a` flag.

Additional options:
- `--benchmark-size` to specify the element count for the benchmark (default: 10000)
- `--benchmark-iterations` to specify the number of iterations for the benchmark per algorithm (default: 15)

## Algorithms
```bash
$ tsrt -b --benchmark-size 100000 --benchmark-iterations 100
```
| Algorithm | Average (ms) | Min (ms) | Max (ms) | Median (ms) | Std Dev (ms) | Range (ms) | ms/element   |
|-----------|--------------|----------|----------|-------------|--------------|------------|--------------|
| quick     | 24.693       | 12.074   | 207.11   | 21.509      | 22.811       | 195.04     | 0.00024693   |
| comb      | 32.323       | 18.202   | 64.786   | 30.486      | 9.4238       | 46.584     | 0.00032323   |
| shell     | 40.369       | 32.093   | 75.934   | 38.967      | 7.3514       | 43.840     | 0.00040369   |
| radix     | 45.511       | 35.089   | 74.952   | 44.374      | 6.6069       | 39.863     | 0.00045511   |
| heap      | 51.216       | 36.055   | 211.79   | 46.513      | 21.530       | 175.73     | 0.00051216   |
| block     | 92.013       | 30.695   | 237.84   | 93.372      | 29.181       | 207.14     | 0.00092013   |
| merge     | 125.37       | 112.68   | 167.63   | 123.91      | 9.0280       | 54.947     | 0.0012537    |

```bash
$ tsrt --info
```

| Name         | Complexity   | Memory Usage | Stable | In Place |
|--------------|--------------|--------------|--------|----------|
| Block sort   | O(n log n)   | O(n)         | true   | true     |
| Comb sort    | O(n^2)       | O(n)         | false  | true     |
| Heap sort    | O(n log n)   | O(1)         | false  | true     |
| Merge sort   | O(n log n)   | O(n)         | true   | false    |
| Quicksort    | O(n log n)   | O(log n)     | false  | true     |
| Radix sort   | O(n)         | O(n)         | true   | false    |
| Shellsort    | O(n^(4/3))   | O(1)         | false  | true     |

## Local development & testing
```bash
# clone the repository
gh repo clone TetieWasTaken/sort-ts
# or
git clone https://github.com/TetieWasTaken/sort-ts.git
```

```bash
# install dependencies
npm install
```

### Using npx tsx
```bash
# to run
npx tsx src/cli.ts -v
# to test
npx tsx test.ts
```

### Using tsc & node
```bash
# to build
npm run build
# to run
node build/cli.js -v
```
##### tests are not available via tsc.

## License & Disclaimer
I cannot guarantee the correctness of the algorithms implemented in this project. Use at your own risk.

I do not own any of the algorithms implemented in this project. The algorithms are based on pseudocode and are aided by online resources and AI tools.

CLI implementation is provided by [commander.js](https://github.com/tj/commander.js/).