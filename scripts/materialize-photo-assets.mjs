import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "photo-source-final");
const outputRoot = path.join(root, "public", "images", "photos", "selected");

const photos = [
  { name: "home-hero.webp", bytes: 107464, sha256: "d24c960d48682f410334ced9fff6b44ce9ef3e2401ca3c631cd870be1054daf9" },
  { name: "about-hero.webp", bytes: 73484, sha256: "4b6989d82ee84864f336549a5d5f31d7c1d5072908518baa9739314111ceadbe" },
  { name: "programs-hero.webp", bytes: 152632, sha256: "0631ec3b1dbdd9040416f29211e25d3b06693f02e25d7e6f00347ac9b76e29c2" },
  { name: "meals-hero.webp", bytes: 31850, sha256: "c32a93d2cc6d3409921675cb2365080214af29261d62aefb44b0ce827e368bfd" },
  { name: "tuition-hero.webp", bytes: 74634, sha256: "8a13d5aeac4de8211b35e80ab59830e7c38dd7a46398f74c242fa93db1523b2f" },
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
