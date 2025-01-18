// block is stable and is overall the best afaik
export const DEFAULT_ALGORITHM: string = "block";
export enum LOG_LEVEL {
  ERROR = "ERROR",
  INFO = "INFO",
  DEBUG = "DEBUG",
}
export enum LOG_LEVEL_VALUE {
  ERROR = 0,
  INFO = 1,
  DEBUG = 2,
}
export const SELECTED_LOG_LEVEL: LOG_LEVEL = LOG_LEVEL.INFO;

export const LOG_LEVEL_ANSI_CODES: { [key in LOG_LEVEL]: string } = {
  [LOG_LEVEL.ERROR]: "\x1b[31m",
  [LOG_LEVEL.INFO]: "\x1b[32m",
  [LOG_LEVEL.DEBUG]: "\x1b[34m",
};

export const IGNORED_ALGORITHMS: string[] = [
  "insertion",
  "tim",
  "selection",
  "counting",
];
