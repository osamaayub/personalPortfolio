type Level = "debug" | "info" | "warn" | "error";
type Meta = Record<string, unknown>;

const LEVELS: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };
const isProd = process.env.NODE_ENV === "production";
const minLevel = LEVELS[(process.env.LOG_LEVEL as Level) in LEVELS ? (process.env.LOG_LEVEL as Level) : isProd ? "info" : "debug"];

const sinks: Record<Level, (...args: unknown[]) => void> = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

const serializeError = (err: Error): Meta => ({
  name: err.name,
  message: err.message,
  stack: isProd ? undefined : err.stack,
  cause: err.cause instanceof Error ? serializeError(err.cause) : err.cause,
});

/** Accepts an Error or a plain context object as the second argument. */
const toMeta = (arg: unknown): Meta => {
  if (arg === undefined) return {};
  if (arg instanceof Error) return { error: serializeError(arg) };
  if (arg && typeof arg === "object") return arg as Meta;
  return { detail: arg };
};

function write(level: Level, scope: string | undefined, message: string, arg?: unknown) {
  if (LEVELS[level] < minLevel) return;
  const meta = toMeta(arg);
  const time = new Date().toISOString();

  if (isProd) {
    // One JSON line per entry so Vercel and other log drains can filter by field.
    sinks[level](JSON.stringify({ time, level, scope, message, ...meta }));
    return;
  }

  const tag = `${time.slice(11, 23)} ${level.toUpperCase().padEnd(5)}${scope ? ` [${scope}]` : ""}`;
  const hasMeta = Object.keys(meta).length > 0;
  if (hasMeta) sinks[level](`${tag} ${message}`, meta);
  else sinks[level](`${tag} ${message}`);
}

export type Logger = {
  debug: (message: string, meta?: unknown) => void;
  info: (message: string, meta?: unknown) => void;
  warn: (message: string, meta?: unknown) => void;
  error: (message: string, meta?: unknown) => void;
  child: (scope: string) => Logger;
};

export function createLogger(scope?: string): Logger {
  return {
    debug: (message, meta) => write("debug", scope, message, meta),
    info: (message, meta) => write("info", scope, message, meta),
    warn: (message, meta) => write("warn", scope, message, meta),
    error: (message, meta) => write("error", scope, message, meta),
    child: (child) => createLogger(scope ? `${scope}:${child}` : child),
  };
}

export const logger = createLogger();
