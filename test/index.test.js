import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ZACHARIA_START,
  ZACHARIA_END,
  ZACHARIA_MS,
  ZACHARIA_DAYS,
  msToZacharias,
  zachariasToMs,
  zacharias,
  zachariasSince,
  zachariasUntil,
  breakdown,
  toScaramuccis,
  fromScaramuccis,
  format,
  describe,
} from '../src/index.js';

const DAY = 24 * 60 * 60 * 1000;

test('one Zacharia is five days', () => {
  assert.equal(ZACHARIA_DAYS, 5);
  assert.equal(ZACHARIA_MS, 5 * DAY);
  assert.equal(zacharias(ZACHARIA_START, ZACHARIA_END), 1);
});

test('accepts Date, number and string inputs', () => {
  assert.equal(zacharias('2026-01-01T00:00:00Z', '2026-01-11T00:00:00Z'), 2);
  assert.equal(zacharias(0, 10 * DAY), 2);
  assert.equal(zacharias(new Date(0), new Date(DAY * 2.5)), 0.5);
});

test('reversed ranges are negative', () => {
  assert.equal(zacharias(10 * DAY, 0), -2);
});

test('rejects invalid dates', () => {
  assert.throws(() => zacharias('not a date', 0), TypeError);
  assert.throws(() => zacharias(0, NaN), TypeError);
});

test('since/until are relative to now', (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: 20 * DAY });
  assert.equal(zachariasSince(0), 4);
  assert.equal(zachariasUntil(25 * DAY), 1);
  assert.equal(zacharias(15 * DAY), 1);
});

test('ms conversions round-trip', () => {
  assert.equal(msToZacharias(zachariasToMs(3.7)), 3.7);
  assert.throws(() => msToZacharias(Infinity), TypeError);
});

test('breakdown splits whole Zacharias and leftover days', () => {
  const b = breakdown(0, 12 * DAY);
  assert.deepEqual(b, {
    zacharias: 2.4,
    whole: 2,
    remainderMs: 2 * DAY,
    remainderDays: 2,
    scaramuccis: 12 / 11,
    negative: false,
  });
  const neg = breakdown(12 * DAY, 0);
  assert.equal(neg.whole, 2);
  assert.equal(neg.remainderDays, 2);
  assert.equal(neg.negative, true);
});

test('Scaramucci conversions', () => {
  assert.equal(fromScaramuccis(1), 2.2);
  assert.equal(toScaramuccis(11), 5);
  assert.equal(toScaramuccis(fromScaramuccis(3)), 3);
});

test('format pluralises and rounds', () => {
  assert.equal(format(1), '1 Zacharia');
  assert.equal(format(-1), '-1 Zacharia');
  assert.equal(format(2.4), '2.4 Zacharias');
  assert.equal(format(1 / 3, { precision: 3 }), '0.333 Zacharias');
  assert.equal(format(-0.0001), '0 Zacharias');
  assert.throws(() => format(NaN), TypeError);
});

test('describe reads past and future ranges', () => {
  assert.equal(describe(0, 5 * DAY), 'That was 1 Zacharia.');
  assert.equal(describe(10 * DAY, 0), 'That is 2 Zacharias away.');
});
