export type DateInput = Date | number | string;

export interface FormatOptions {
  /** Decimal places, default 2 (trailing zeros dropped). */
  precision?: number;
}

export interface Breakdown {
  /** Signed, fractional Zacharias. */
  zacharias: number;
  /** Whole Zacharias in the absolute range. */
  whole: number;
  /** Leftover milliseconds after the whole Zacharias. */
  remainderMs: number;
  /** Leftover days after the whole Zacharias. */
  remainderDays: number;
  /** Signed, fractional Scaramuccis. */
  scaramuccis: number;
  /** True when `end` precedes `start`. */
  negative: boolean;
}

export const ZACHARIA_START: Date;
export const ZACHARIA_END: Date;
export const ZACHARIA_MS: number;
export const ZACHARIA_DAYS: number;
export const SCARAMUCCI_MS: number;

export function msToZacharias(ms: number): number;
export function zachariasToMs(zacharias: number): number;
export function zacharias(start: DateInput, end?: DateInput): number;
export function zachariasSince(start: DateInput): number;
export function zachariasUntil(end: DateInput): number;
export function breakdown(start: DateInput, end?: DateInput): Breakdown;
export function toScaramuccis(zacharias: number): number;
export function fromScaramuccis(scaramuccis: number): number;
export function format(value: number, options?: FormatOptions): string;
export function describe(start: DateInput, end?: DateInput, options?: FormatOptions): string;
