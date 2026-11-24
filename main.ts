// One-line AI excuse for breaking production — Akun Utama (1/3).
// Writes the final entry text to /output/entry.txt (or MAKEFUN_OUTPUT_DIR).
// Plain JavaScript, stdlib only, no network, no writes inside the repo.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The entry line is assembled from its two beats so the punchline
// (the rollback deleting itself) stays the final clause.
const SETUP = "My deploy worked flawlessly — it deployed the build that deletes the deploy,";
const PUNCH = "then my rollback deleted the rollback.";
const ENTRY = `${SETUP} ${PUNCH}`;

function resolveOutDir() {
  if (process.env.MAKEFUN_OUTPUT_DIR) return process.env.MAKEFUN_OUTPUT_DIR;
  return "/output";
}

function writeEntry(outDir, text) {
  fs.mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, "entry.txt");
  fs.writeFileSync(target, text, "utf8");
  return target;
}

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
void repoRoot;

try {
  const target = writeEntry(resolveOutDir(), ENTRY);
  void target;
} catch (err) {
  console.error("failed to write entry:", err);
  process.exit(1);
}
