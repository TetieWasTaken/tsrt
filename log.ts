import { LOG_LEVEL, LOG_LEVEL_ANSI_CODES } from "./constants";

export default function log(level: LOG_LEVEL, message: string): void {
  try {
    const date = new Date().toISOString();
    const color = LOG_LEVEL_ANSI_CODES[level];
    console.log(`${color}[${date}] ${level}: ${message}\x1b[0m`);
  } catch (error) {
    console.warn("Failed to log message", error);
  }
}
