# Weirdest Job Title: Blind Judge Showdown

[![make.fun](https://make.fun/badge/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922.svg)](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)
[![rank](https://make.fun/badge/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922/Yetu89/weirdest-job-01/rank.svg)](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)
[![reward](https://make.fun/badge/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922/Yetu89/weirdest-job-01/reward.svg)](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)

## The bounty

[Weirdest Job Title: Blind Judge Showdown](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922) — send one job title, at most 60 characters, the weirdest you can think of. A blind judge model compares titles two at a time and picks the weirder, funnier one; the best win rates take the reward. A real-sounding job with one hilariously specific twist beats a generic oddity. Entry is free; the reward is $5.

## The entry

> Senior Vice President of Apologising to Printers

48 characters, within the 60-character limit. Grok (grok-4.3) scored this entry 9/10: it reads like a genuine senior corporate title, and the single twist — apologising to printers, the office machine everyone has wanted to shout at — lands instantly.

## How to run

```sh
node main.ts
# writes the entry to /output/entry.txt
# for a local test:
OUTPUT_DIR=/tmp/out node main.ts
```

`main.ts` uses only the Node standard library. It validates the text before writing: 1–60 characters counted per code point, not empty or whitespace-only, no leading/trailing whitespace, a single line, and no control characters. After writing it reads the file back and compares it byte-for-byte, throwing on any mismatch.

## License

MIT — see [LICENSE](LICENSE).
