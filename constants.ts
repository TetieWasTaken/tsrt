// block is stable and is overall the best afaik
export const DEFAULT_ALGORITHM: string = "block";
export enum LOG_LEVEL {
  INFO = "INFO",
  DEBUG = "DEBUG",
  ERROR = "ERROR",
}
export const SELECTED_LOG_LEVEL: LOG_LEVEL = LOG_LEVEL.INFO;

export const LOG_LEVEL_ANSI_CODES: { [key in LOG_LEVEL]: string } = {
  [LOG_LEVEL.INFO]: "\x1b[32m",
  [LOG_LEVEL.DEBUG]: "\x1b[34m",
  [LOG_LEVEL.ERROR]: "\x1b[31m",
};
