import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { access, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const archive = path.join(root, "photo-source", "photo-assets-final.tgz");
const output = path.join(root, "public", "images", "photos", "selected");
const expectedArchiveSha256 =
  "c1c1243cc0d18b33521968e88fa9a4e517438f56bedd24f147ba27e635a91617";

const expectedFiles = [
  "airplanes.webp",
  "child-classroom.webp",
  "child-playdough.webp",
  "community.webp",
  "group-circle.webp",
  "home-hero.webp",
  "school-age.webp",
  "teacher-art.webp",
  "teacher-group.webp",
  "teacher-sensory.webp",
];

const bytes = await readFile(archive);
const digest = createHash("sha256").update(bytes).digest("hex");
if (digest !== expectedArchiveSha256) {
  throw new Error(
    `Photo archive integrity check failed: expected ${expectedArchiveSha256}, got ${digest}`,
  );
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

execFileSync("tar", ["-xzf", archive, "-C", output], {
  stdio: "inherit",
});

for (const name of expectedFiles) {
  await access(path.join(output, name));
}

console.log(`Prepared ${expectedFiles.length} verified website photos.`);
