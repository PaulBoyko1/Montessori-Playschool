import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "photo-source");
const outputRoot = path.join(projectRoot, "public", "images", "photos", "selected");

const photos = [
  {
    name: "home-hero.webp",
    bytes: 143986,
    sha256: "eaba07ce704a5896cf0c21f182457f14c833016d10a319d4c0bceccda05f2e9e",
  },
  {
    name: "about-hero.webp",
    bytes: 69516,
    sha256: "9003e29e10a9f51eda9a5f07d13c26c3897198bb68f69114e59878b600054a26",
  },
  {
    name: "programs-hero.webp",
    bytes: 117236,
    sha256: "17a37a314d0740be67c1bbbd1ae778be0684585484eec9025e1b4b9e9b8e2c65",
  },
  {
    name: "meals-hero.webp",
    bytes: 74660,
    sha256: "7e95174949b3f6bc070d69b5babf31bbf41f1d791d7932bc59732dc27b3536d5",
  },
  {
    name: "tuition-hero.webp",
    bytes: 77580,
    sha256: "3d5337c4c7f8c7bbec837e31c4a0872fa3efd96571fea612ff5935410c6d7c24",
  },
  {
    name: "classroom-group.webp",
    bytes: 121480,
    sha256: "d75a458eb950299bc63d94e8ed90d0e6c07e41fb069599443cbcb051c1e676dc",
  },
];

await mkdir(outputRoot, { recursive: true });

for (const photo of photos) {
  const stem = photo.name.replace(/\.webp$/, "");
  const partsDirectory = path.join(sourceRoot, stem);
  const partNames = (await readdir(partsDirectory))
    .filter((name) => /^part-\d+\.b64$/.test(name))
    .sort();

  if (partNames.length === 0) {
    throw new Error(`No encoded source parts found for ${photo.name}`);
  }

  const chunks = await Promise.all(
    partNames.map((name) => readFile(path.join(partsDirectory, name), "utf8")),
  );
  const encoded = chunks.join("").replace(/\s+/g, "");
  const bytes = Buffer.from(encoded, "base64");
  const digest = createHash("sha256").update(bytes).digest("hex");

  if (bytes.length !== photo.bytes) {
    throw new Error(
      `${photo.name} decoded to ${bytes.length} bytes; expected ${photo.bytes}`,
    );
  }

  if (digest !== photo.sha256) {
    throw new Error(
      `${photo.name} failed integrity verification (${digest} != ${photo.sha256})`,
    );
  }

  await writeFile(path.join(outputRoot, photo.name), bytes);
  console.log(`Prepared ${photo.name} (${photo.bytes.toLocaleString()} bytes)`);
}
