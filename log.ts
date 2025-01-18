import {
  LOG_LEVEL,
  LOG_LEVEL_ANSI_CODES,
  LOG_LEVEL_VALUE,
  SELECTED_LOG_LEVEL,
} from "./constants";

export default function log(
  level: LOG_LEVEL,
  message: string,
  plain: boolean,
): void {
  if (LOG_LEVEL_VALUE[level] > LOG_LEVEL_VALUE[SELECTED_LOG_LEVEL]) {
    return;
  }

  try {
    const date = new Date().toISOString();
    if (plain) console.log(`[${date}] ${level}: ${message}`);
    else {
      const color = LOG_LEVEL_ANSI_CODES[level];
      console.log(`${color}[${date}] ${level}: ${message}\x1b[0m`);
    }
  } catch (error) {
    console.warn("Failed to log message", error);
  }
}
