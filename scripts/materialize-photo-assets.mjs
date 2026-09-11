import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "photo-source-final");
const outputRoot = path.join(root, "public", "images", "photos", "selected");

const photos = [
  { name: "home-hero.webp", bytes: 107464, sha256: "8fe0df22627cde2e12c9fbe96efd51c030792aafd07134cc38716fa5885f2188" },
  { name: "about-hero.webp", bytes: 73484, sha256: "b8e8f98d5460feb83c8514e46a52c50ded5add6cb4b9712fbb1042f4d0e467c9" },
  { name: "programs-hero.webp", bytes: 152632, sha256: "e15d5e1adbcc3503fd3bb03dcd983536e6d28650acf2052837f771badead9de0" },
  { name: "meals-hero.webp", bytes: 31850, sha256: "00deabfceede93724798f30e6f798ff875e8615a85b191318e4ac2e5a9164f95" },
  { name: "tuition-hero.webp", bytes: 74634, sha256: "75ac5e7393afd8ac50592296d4f7d4b4e86b4fadba4e6561bc665b89349c9666" },
];

await mkdir(outputRoot, { recursive: true });

for (const photo of photos) {
  const stem = photo.name.replace(/\.webp$/, "");
  const dir = path.join(sourceRoot, stem);
  const parts = (await readdir(dir))
    .filter((name) => /^part-\d+\.b64$/.test(name))
    .sort();

  if (!parts.length) throw new Error(`No source chunks for ${photo.name}`);

  const encoded = (await Promise.all(parts.map((part) => readFile(path.join(dir, part), "utf8"))))
    .join("")
    .replace(/\s+/g, "");
  const bytes = Buffer.from(encoded, "base64");
  const digest = createHash("sha256").update(bytes).digest("hex");

  if (bytes.length !== photo.bytes) {
    throw new Error(`${photo.name}: decoded ${bytes.length} bytes; expected ${photo.bytes}`);
  }
  if (digest !== photo.sha256) {
    throw new Error(`${photo.name}: integrity check failed (${digest})`);
  }

  await writeFile(path.join(outputRoot, photo.name), bytes);
  console.log(`Prepared ${photo.name} (${photo.bytes.toLocaleString()} bytes)`);
}
