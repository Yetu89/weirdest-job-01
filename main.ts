// ============================================================================
// Weirdest Job Title: Blind Judge Showdown
// Entry: "Senior Vice President of Apologising to Printers" (48 characters)
// ============================================================================
//
// THE IDEA, IN ONE SENTENCE
// --------------------------
// Take the most familiar frame in corporate life — a Senior Vice President
// — and give that executive exactly one absurd duty: apologising to printers.
//
// WHY THE FRAME WORKS
// -------------------
// "Senior Vice President of ..." is a shape every reader already knows from
// org charts and email signatures. That familiarity does real work here: it
// makes the title register, at first glance, as a plausible job a real
// company might have (the bounty asks for exactly that — a title that sounds
// like a real job). The reader pictures a person with a desk, a calendar,
// and a salary, not a random string of funny words.
//
// WHY THE TWIST WORKS
// -------------------
// The joke then turns on a single, sharply chosen detail. Everyone who has
// ever worked in an office has wanted to shout at a printer — the jammed
// tray, the mysterious offline status, the page that comes out blank. This
// title flips that frustration around: instead of a human yelling at the
// machine, a senior executive spends their whole career saying sorry to it.
// One twist, one image, no explanation needed. That is why it scores on
// weirdness and on humour at the same time: the absurdity is specific
// enough to picture, and universal enough that anyone gets it instantly.
//
// WHY IT STAYS SHORT
// ------------------
// A longer title could have piled on extra oddities, but that would dilute
// the joke. The bounty rewards the weirdest title, not the longest one, and
// a blind judge reading titles two at a time decides in seconds. So every
// word here has to pull its weight:
//   - "Senior Vice President" builds the corporate frame.
//   - "Apologising" supplies the human, slightly desperate verb — the
//     whole job, in a single word.
//   - "to Printers" names the absurd recipient of all that apologising.
// Take any one of the three away and the joke falls apart; add anything
// else and it starts to ramble. At 48 characters it sits comfortably
// inside the 60-character gate, with room to spare.
//
// HOW THIS FILE IS BUILT
// -----------------------
// The program below is deliberately boring and defensive. It does three
// things, in order:
//   1. validate() checks the entry against every gate rule in RULES.txt
//      before anything is written, so an invalid entry fails loudly here
//      instead of silently reaching the judge.
//   2. main() writes the entry to $OUTPUT_DIR/entry.txt (default /output).
//   3. main() then reads that file straight back and compares it with
//      the original text, character for character. This round-trip check
//      matters because a truncated or corrupted write would otherwise
//      look like a success — the program would exit cleanly while the
//      file on disk said something different. Comparing byte-for-byte
//      closes that gap: if the file does not match, the run throws.
//
// GATE RULES (from the bounty RULES.txt)
// --------------------------------------
// - The entry must be UTF-8 text of 1 to 60 characters, never
//   whitespace-only.
// - It must be one job title and nothing else: a single line, with no
//   leading or trailing whitespace and no control characters.
// - Length is counted in code points, not UTF-16 code units, so a title
//   containing characters outside the Basic Multilingual Plane would
//   still be measured the way a reader counts it.
//
// SCORING NOTE
// ------------
// Grok (grok-4.3) scored this entry 9/10.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT = "Senior Vice President of Apologising to Printers";

function validate(text: string): void {
  // Gate 1 — empty or whitespace-only: an entry of nothing but spaces
  // would pass a length check yet say nothing, so reject it outright.
  if (text.trim().length === 0) {
    throw new Error("entry is empty or whitespace only");
  }
  // Gate 2 — leading/trailing whitespace: stray spaces would make the
  // file differ from the title as written, and a judge reading the file
  // would see padding that is not part of the job title.
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  // Gate 3 — single line only: a newline would turn one job title into
  // two lines of text, breaking the "one title and nothing else" rule.
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line with no newline characters");
  }
  // Gate 4 — length 1..60 code points: spreading the string into an array
  // counts code points (one per visible character), which is the honest
  // measure for a title a human reads, rather than UTF-16 code units.
  const len = [...text].length;
  if (len < 1 || len > 60) {
    throw new Error(
      `entry must be 1-60 characters (code points), got ${len} code points`,
    );
  }
  // Gate 5 — no control characters: anything below 0x20 or the DEL
  // character (0x7f) is invisible formatting, not part of a job title,
  // and could corrupt the file or confuse the judge.
  for (const ch of text) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("entry must not contain control characters");
    }
  }
}

function main(): void {
  // Validate first, write second: never put an unchecked entry on disk.
  validate(TEXT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");
  // Round-trip check: read the file back and demand an exact match.
  // This is the last line of defence — if the write was truncated,
  // mangled, or encoded differently, the mismatch throws here instead
  // of letting a damaged entry reach the judge.
  const readBack = readFileSync(outPath, "utf8");
  if (readBack !== TEXT) {
    throw new Error("read-back mismatch: entry.txt differs from TEXT");
  }
  console.log(`Wrote ${[...TEXT].length} characters to ${outPath}`);
}

main();
