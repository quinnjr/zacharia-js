# zacharia-js

Measure time in **Zacharias**.

One Zacharia is how long Katie Zacharia served as White House Press Secretary:
announced October 11, 2026, out October 16, 2026. That's **5 days**. It works
like the Scaramucci, Anthony Scaramucci's 11 days as White House
Communications Director in 2017.

| Unit | Days |
| --- | --- |
| 1 Zacharia | 5 |
| 1 Scaramucci | 11 (= 2.2 Zacharias) |

It has no dependencies and ships as an ES module, so it runs the same in Node
and in the browser.

## Install

```sh
pnpm add zacharia-js
```

## Usage

```js
import { zacharias, zachariasSince, breakdown, format, describe } from 'zacharia-js';

zacharias('2026-01-01', '2026-01-11');   // 2
format(zachariasSince('2026-10-11'));    // e.g. "1 Zacharia"
describe('2026-01-01', '2026-01-13');    // "That was 2.4 Zacharias."

breakdown('2026-01-01', '2026-01-13');
// { zacharias: 2.4, whole: 2, remainderMs: 172800000, remainderDays: 2,
//   scaramuccis: 1.0909..., negative: false }
```

In the browser, without a bundler:

```html
<script type="module">
  import { zachariasSince, format } from 'https://cdn.jsdelivr.net/npm/zacharia-js@1.0.0/src/index.js';
  document.body.textContent = format(zachariasSince('2026-10-11'));
</script>
```

## API

Each date argument can be a `Date`, an epoch-milliseconds number, or a string
that `Date.parse` understands. An invalid date throws a `TypeError`.

| Function | Returns |
| --- | --- |
| `zacharias(start, end = now)` | Zacharias between two moments. Negative if `end` is before `start`. |
| `zachariasSince(start)` | Zacharias from `start` until now. |
| `zachariasUntil(end)` | Zacharias from now until `end`. |
| `breakdown(start, end = now)` | Whole Zacharias plus the leftover time, and the same range in Scaramuccis. |
| `msToZacharias(ms)` / `zachariasToMs(z)` | Converts between milliseconds and Zacharias. |
| `toScaramuccis(z)` / `fromScaramuccis(s)` | Converts between Zacharias and Scaramuccis. |
| `format(value, { precision = 2 })` | Readable text, such as `"2.4 Zacharias"` or `"1 Zacharia"`. |
| `describe(start, end = now, options)` | A sentence, such as `"That was 3 Zacharias."` or `"That is 2 Zacharias away."` |

The exported constants are `ZACHARIA_START`, `ZACHARIA_END`, `ZACHARIA_MS`,
`ZACHARIA_DAYS` and `SCARAMUCCI_MS`.

## Test

```sh
pnpm test
```
