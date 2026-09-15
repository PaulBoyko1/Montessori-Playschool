import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

let workerPromise;

function getWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    workerPromise = import(workerUrl.href).then((module) => module.default);
  }
  return workerPromise;
}

async function render(pathname) {
  const worker = await getWorker();
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  const html = await response.text();
  return { response, html };
}

test("renders development preview metadata", async () => {
  const { response, html } = await render("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(html, developmentPreviewMeta);
});

test("renders every public page", async () => {
  const routes = [
    "/",
    "/about",
    "/programs",
    "/gallery",
    "/meals",
    "/tuition",
    "/location",
    "/enrollment",
    "/contact",
    "/privacy",
  ];

  for (const route of routes) {
    const { response } = await render(route);
    assert.equal(response.status, 200, `${route} should render successfully`);
  }
});

test("renders the icon-only mobile navigation trigger", async () => {
  const { html } = await render("/");

  assert.match(html, /aria-label=["']Open navigation menu["']/i);
  assert.match(html, /class=["']mobile-menu-icon["']/i);
  assert.doesNotMatch(html, />\s*Menu\s*</i);
  assert.doesNotMatch(html, />\s*Open\s*</i);
});

test("keeps current public program structure and meal schedule", async () => {
  const home = await render("/");
  const programs = await render("/programs");
  const enrollment = await render("/enrollment");
  const meals = await render("/meals");

  assert.match(home.html, /birth through 9th grade/i);
  assert.match(programs.html, /Kindergarten(?:–|&ndash;|&#x2013;)9th grade/i);
  assert.match(enrollment.html, /Infant, Preschool (?:&amp;|&) School Age/i);

  for (const page of [home.html, programs.html, enrollment.html]) {
    assert.doesNotMatch(page, /Toddler Program/i);
  }

  assert.match(meals.html, /Breakfast[^<]*8:00 AM/i);
  assert.match(meals.html, /Lunch[^<]*1:00 PM/i);
  assert.match(meals.html, /Snack[^<]*3:00 PM/i);
  assert.match(meals.html, /Dinner[^<]*5:00 PM/i);
});


test("uses the selected high-quality photography across key pages", async () => {
  const home = await render("/");
  const about = await render("/about");
  const programs = await render("/programs");
  const meals = await render("/meals");
  const tuition = await render("/tuition");
  const gallery = await render("/gallery");

  assert.match(home.html, /\/images\/photos\/selected\/group-circle\.webp/);
  assert.match(about.html, /\/images\/photos\/selected\/teacher-art\.webp/);
  assert.match(programs.html, /\/images\/photos\/selected\/teacher-group\.webp/);
  assert.match(meals.html, /\/images\/photos\/selected\/child-playdough\.webp/);
  assert.match(tuition.html, /\/images\/photos\/selected\/community\.webp/);

  const galleryPhotos = [
    "home-hero.webp",
    "teacher-art.webp",
    "teacher-group.webp",
    "teacher-sensory.webp",
    "child-playdough.webp",
    "airplanes.webp",
    "group-circle.webp",
    "child-classroom.webp",
    "community.webp",
    "school-age.webp",
  ];

  for (const photo of galleryPhotos) {
    assert.match(
      gallery.html,
      new RegExp(`/images/photos/selected/${photo.replace(".", "\\.")}`),
      `gallery should include ${photo}`,
    );
  }

  assert.doesNotMatch(home.html, /classroom-teacher-group\.webp/);
});
