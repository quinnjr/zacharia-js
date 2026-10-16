/**
 * zacharia-js — measure time in Zacharias.
 *
 * One Zacharia is the length of Katie Zacharia's tenure as White House Press
 * Secretary: announced October 11, 2026, out October 16, 2026 — five days.
 * In the spirit of the Scaramucci (Anthony Scaramucci's 11 days as White House
 * Communications Director, July 21–31, 2017).
 *
 * Works unchanged in Node and the browser: no dependencies, no platform APIs.
 */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Start of the Zacharia era (UTC). */
export const ZACHARIA_START = new Date(Date.UTC(2026, 9, 11));
/** End of the Zacharia era (UTC). */
export const ZACHARIA_END = new Date(Date.UTC(2026, 9, 16));

/** One Zacharia in milliseconds (5 days). */
export const ZACHARIA_MS = ZACHARIA_END.getTime() - ZACHARIA_START.getTime();
/** One Zacharia in days. */
export const ZACHARIA_DAYS = ZACHARIA_MS / MS_PER_DAY;

/** One Scaramucci in milliseconds (11 days), for conversions. */
export const SCARAMUCCI_MS = 11 * MS_PER_DAY;

/**
 * Normalise a Date, epoch-milliseconds number, or date string to epoch ms.
 * @param {Date | number | string} value
 * @param {string} name argument name for error messages
 * @returns {number}
 */
function toMs(value, name) {
  const ms = value instanceof Date ? value.getTime() : typeof value === 'number' ? value : Date.parse(value);
  if (!Number.isFinite(ms)) {
    throw new TypeError(`${name} is not a valid date: ${String(value)}`);
  }
  return ms;
}

/**
 * Convert a duration in milliseconds to Zacharias.
 * @param {number} ms
 * @returns {number}
 */
export function msToZacharias(ms) {
  if (!Number.isFinite(ms)) throw new TypeError(`ms must be a finite number: ${String(ms)}`);
  return ms / ZACHARIA_MS;
}

/**
 * Convert Zacharias to milliseconds.
 * @param {number} zacharias
 * @returns {number}
 */
export function zachariasToMs(zacharias) {
  if (!Number.isFinite(zacharias)) throw new TypeError(`zacharias must be a finite number: ${String(zacharias)}`);
  return zacharias * ZACHARIA_MS;
}

/**
 * How many Zacharias passed between two moments. Negative if `end` precedes `start`.
 * @param {Date | number | string} start
 * @param {Date | number | string} [end] defaults to now
 * @returns {number}
 */
export function zacharias(start, end = Date.now()) {
  return msToZacharias(toMs(end, 'end') - toMs(start, 'start'));
}

/**
 * How many Zacharias have passed since a moment, as of now.
 * @param {Date | number | string} start
 * @returns {number}
 */
export function zachariasSince(start) {
  return zacharias(start, Date.now());
}

/**
 * How many Zacharias remain until a moment, from now.
 * @param {Date | number | string} end
 * @returns {number}
 */
export function zachariasUntil(end) {
  return zacharias(Date.now(), end);
}

/**
 * Break a time range into whole Zacharias plus the leftover days.
 * @param {Date | number | string} start
 * @param {Date | number | string} [end] defaults to now
 * @returns {{ zacharias: number, whole: number, remainderMs: number, remainderDays: number, scaramuccis: number, negative: boolean }}
 */
export function breakdown(start, end = Date.now()) {
  const diff = toMs(end, 'end') - toMs(start, 'start');
  const abs = Math.abs(diff);
  const whole = Math.floor(abs / ZACHARIA_MS);
  const remainderMs = abs - whole * ZACHARIA_MS;
  return {
    zacharias: diff / ZACHARIA_MS,
    whole,
    remainderMs,
    remainderDays: remainderMs / MS_PER_DAY,
    scaramuccis: diff / SCARAMUCCI_MS,
    negative: diff < 0,
  };
}

/**
 * Convert Zacharias to Scaramuccis (1 Zacharia = 5/11 Scaramucci).
 * @param {number} zacharias
 * @returns {number}
 */
export function toScaramuccis(zacharias) {
  return zachariasToMs(zacharias) / SCARAMUCCI_MS;
}

/**
 * Convert Scaramuccis to Zacharias (1 Scaramucci = 2.2 Zacharias).
 * @param {number} scaramuccis
 * @returns {number}
 */
export function fromScaramuccis(scaramuccis) {
  if (!Number.isFinite(scaramuccis)) throw new TypeError(`scaramuccis must be a finite number: ${String(scaramuccis)}`);
  return msToZacharias(scaramuccis * SCARAMUCCI_MS);
}

/**
 * Format a Zacharia count for humans, e.g. "2.4 Zacharias" or "1 Zacharia".
 * @param {number} value
 * @param {{ precision?: number }} [options] decimal places, default 2 (trailing zeros dropped)
 * @returns {string}
 */
export function format(value, { precision = 2 } = {}) {
  if (!Number.isFinite(value)) throw new TypeError(`value must be a finite number: ${String(value)}`);
  const rounded = Number(value.toFixed(precision));
  // Avoid "-0 Zacharias" for tiny negative values.
  const shown = Object.is(rounded, -0) ? 0 : rounded;
  return `${shown} ${Math.abs(shown) === 1 ? 'Zacharia' : 'Zacharias'}`;
}

/**
 * Describe how much time passed between two moments, in Zacharias.
 * @param {Date | number | string} start
 * @param {Date | number | string} [end] defaults to now
 * @param {{ precision?: number }} [options]
 * @returns {string} e.g. "That was 3.2 Zacharias."
 */
export function describe(start, end = Date.now(), options) {
  const value = zacharias(start, end);
  return value < 0
    ? `That is ${format(-value, options)} away.`
    : `That was ${format(value, options)}.`;
}
