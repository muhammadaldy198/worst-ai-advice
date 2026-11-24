import { mkdirSync, writeFileSync } from "node:fs";

// The worst advice an AI could give: swallow your mouthwash.
// The confident extrapolation ("imagine what it does inside") is
// exactly the kind of tidy, wrong logic an AI assistant produces.
const LINE =
  "Swallow your mouthwash — if it kills germs in your mouth, imagine what it does inside.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 140) {
    throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
  }
  // The gate counts characters and rejects whitespace-only text, so the
  // line must be exactly one visible line: no newline, no control or
  // invisible characters, nothing leading or trailing.
  if (/[\u0000-\u001F\u007F\u00A0\u200B]/.test(LINE)) {
    throw new Error("line has control or invisible characters");
  }
  if (LINE !== LINE.trim()) {
    throw new Error("line has leading or trailing whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
}

main();
