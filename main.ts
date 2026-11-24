import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The worst advice an AI could give, delivered with total confidence:
// smear yourself in honey so the mosquitoes get stuck — and you end up
// smelling like breakfast. Three beats, one concrete twist at the end.
// Beat 1: the remedy (honey). Beat 2: the trap (stuck on the way in).
// Beat 3: the kicker (smell like breakfast) — concrete, last, no capitals.
const ENTRY =
  "Certainly! To stop mosquito bites, cover yourself in honey — mosquitoes get stuck on the way in, and you smell like breakfast.";

const MIN_CHARS = 1;
const MAX_CHARS = 140;

function codePoints(text: string): number {
  return [...text].length;
}

function main(): void {
  const chars = codePoints(ENTRY);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (
    ENTRY !== ENTRY.trim() ||
    /[\u0000-\u001F\u007F\u00A0\u200B]/.test(ENTRY)
  ) {
    throw new Error("entry must be exactly one visible line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, ENTRY, "utf8");
  chmodSync(outFile, 0o644);
}

main();
