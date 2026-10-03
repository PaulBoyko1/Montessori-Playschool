import assert from "node:assert/strict";
import test from "node:test";

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

test("renders the homepage as HTML", async () => {
  const { response, html } = await render("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(html, /Montessori Playschool/i);
  assert.doesNotMatch(html, /codex-preview/i);
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
  assert.match(programs.html, /24 months(?:–|&ndash;|&#x2013;)entry into kindergarten/i);
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


test("renders current tuition cleanly without weekly pricing or admin clutter", async () => {
  const { html } = await render("/tuition");

  assert.match(html, /#343628256/);
  assert.match(html, /Monday(?:–|&ndash;|&#x2013;)Saturday/i);
  assert.match(html, /Day program[\s\S]*7:00 AM(?:–|&ndash;|&#x2013;)5:00 PM/i);
  assert.match(html, /Evening program[\s\S]*5:00 PM(?:–|&ndash;|&#x2013;)10:00 PM/i);
  assert.match(html, /\$2,500/);
  assert.match(html, /\$2,700/);
  assert.match(html, /\$1,250/);
  assert.match(html, /\$1,400/);
  assert.match(html, /Preschool:[\s\S]*24 months through entry into kindergarten/i);
  assert.doesNotMatch(html, /Hourly part-time rates/i);
  assert.doesNotMatch(html, /Part-time care/i);
  assert.doesNotMatch(html, /\$18 \/ hour/i);
  assert.doesNotMatch(html, /\$15 \/ hour/i);
  assert.doesNotMatch(html, /\$10 \/ hour/i);
  assert.doesNotMatch(html, /\$8 \/ hour/i);
  assert.match(html, /additional[\s\S]*\$75 per day/i);
  assert.match(html, /New Year(?:’|&rsquo;|&#x2019;)s Day/i);
  assert.match(html, /Thanksgiving Day/i);
  assert.match(html, /School supplies fee/i);

  assert.doesNotMatch(html, /Rate sheet effective/i);
  assert.doesNotMatch(html, /Effective date/i);
  assert.doesNotMatch(html, /Type of care/i);
  assert.doesNotMatch(html, /Weekly reference rates/i);
  assert.doesNotMatch(html, /\/ week/i);
  assert.doesNotMatch(html, /schedule overlaps the day and evening programs/i);
  assert.match(html, /Need a custom schedule\?/i);
  assert.match(html, /custom times that may work for your family/i);
  assert.doesNotMatch(html, /\$1,450/);
  assert.doesNotMatch(html, /\$1,600/);
  assert.doesNotMatch(html, /Part-time attendance/i);
  assert.doesNotMatch(html, /Tuition is due on the first day of each month/i);
  assert.doesNotMatch(html, /late fee/i);
  assert.doesNotMatch(html, /Returned payments/i);
});
