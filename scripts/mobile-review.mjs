import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, webkit } from "playwright";

const baseURL = "http://127.0.0.1:3000";
const routes = ["/", "/about", "/programs", "/meals", "/gallery", "/tuition", "/location", "/enrollment", "/contact", "/privacy"];
const viewports = [
  { width: 320, height: 568 }, { width: 360, height: 640 },
  { width: 375, height: 667 }, { width: 390, height: 844 },
  { width: 412, height: 915 }, { width: 430, height: 932 },
  { width: 667, height: 375 }, { width: 844, height: 390 },
];
const results = [];
const issues = [];
await mkdir("mobile-review", { recursive: true });

async function loadPage(page, route) {
  await page.goto(baseURL + route, { waitUntil: "networkidle" });
  await page.locator("img").evaluateAll((images) => images.forEach((img) => { img.loading = "eager"; }));
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (img) => img.decode().catch(() => {})));
  });
}

async function screenshotStrip(browser, page, route) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const positions = [0, Math.max(0, Math.round((height - 844) / 2)), Math.max(0, height - 844)];
  const sources = [];
  for (const y of positions) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    const bytes = await page.screenshot({ type: "jpeg", quality: 65, animations: "disabled" });
    sources.push("data:image/jpeg;base64," + bytes.toString("base64"));
  }
  const canvasPage = await browser.newPage({ viewport: { width: 1170, height: 874 } });
  await canvasPage.setContent('<canvas width="1170" height="874"></canvas>');
  const dataURL = await canvasPage.evaluate(async ({ sources, route }) => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#111111";
    ctx.font = "16px Arial";
    const labels = ["Top", "Middle", "Footer"];
    for (let i = 0; i < sources.length; i++) {
      const img = new Image();
      img.src = sources[i];
      await img.decode();
      ctx.fillText(route + " — " + labels[i], 390 * i + 8, 21);
      ctx.drawImage(img, 390 * i, 30, 390, 844);
    }
    return canvas.toDataURL("image/jpeg", 0.65);
  }, { sources, route });
  await canvasPage.close();
  console.log("MOBILE_IMAGE " + (route.slice(1) || "home") + " " + dataURL.slice(dataURL.indexOf(",") + 1));
}


async function photoSheet(browser, page, label) {
  const headerStyle = await page.addStyleTag({ content: ".site-header { visibility: hidden !important; }" });
  const photos = page.locator('main img[src*="/photos/"]');
  const tiles = [];
  for (let i = 0; i < await photos.count(); i++) {
    const img = photos.nth(i);
    if (!await img.isVisible()) continue;
    const source = await img.getAttribute("src");
    const bytes = await img.screenshot({ type: "jpeg", quality: 70, animations: "disabled" });
    tiles.push({ label: source.split("/").at(-1), source: "data:image/jpeg;base64," + bytes.toString("base64") });
  }
  await headerStyle.evaluate((el) => el.remove());
  if (!tiles.length) return;
  const canvasPage = await browser.newPage();
  await canvasPage.setContent('<canvas></canvas>');
  const dataURL = await canvasPage.evaluate(async (tiles) => {
    const canvas = document.querySelector("canvas");
    canvas.width = 1080;
    canvas.height = Math.ceil(tiles.length / 3) * 520;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    for (let i = 0; i < tiles.length; i++) {
      const img = new Image();
      img.src = tiles[i].source;
      await img.decode();
      const x = (i % 3) * 360;
      const y = Math.floor(i / 3) * 520;
      ctx.fillStyle = "#111";
      ctx.fillText(tiles[i].label, x + 8, y + 20);
      const scale = Math.min(352 / img.width, 480 / img.height);
      ctx.drawImage(img, x + 4, y + 32, img.width * scale, img.height * scale);
    }
    return canvas.toDataURL("image/jpeg", 0.7);
  }, tiles);
  await canvasPage.close();
  console.log("MOBILE_IMAGE " + label + " " + dataURL.split(",")[1]);
}

for (const [engine, browserType] of [["chromium", chromium], ["webkit", webkit]]) {
  const browser = await browserType.launch();
  const sizes = engine === "webkit" ? [viewports[0], viewports[3], viewports[7]] : viewports;
  for (const viewport of sizes) {
    const context = await browser.newContext({
      viewport, isMobile: true, hasTouch: true, deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    await context.route("**/*", (route) => {
      if (new URL(route.request().url()).origin === baseURL) return route.continue();
      return route.abort();
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const runtimeErrors = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    for (const route of routes) {
      const key = engine + "-" + viewport.width + "x" + viewport.height + "-" + (route.slice(1) || "home");
      try {
        runtimeErrors.length = 0;
        await loadPage(page, route);
        const metrics = await page.evaluate(() => {
          const visible = (el) => {
            const style = getComputedStyle(el);
            const box = el.getBoundingClientRect();
            return style.display !== "none" && style.visibility !== "hidden" && box.width > 1 && box.height > 1;
          };
          const selector = (el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (el.className && typeof el.className === "string" ? "." + el.className.trim().replace(/\s+/g, ".") : "");
          const overflow = Array.from(document.querySelectorAll("main h1,main h2,main h3,main p,main a,main button,main input,main select,main textarea,main li,main dt,main dd,main label,main figcaption,footer a"))
            .filter(visible).filter((el) => {
              const box = el.getBoundingClientRect();
              return box.left < -2 || box.right > innerWidth + 2;
            }).map((el) => ({ element: selector(el), text: el.textContent.trim().slice(0, 60), left: Math.round(el.getBoundingClientRect().left), right: Math.round(el.getBoundingClientRect().right) }));
          const images = Array.from(document.images).filter(visible).map((img) => {
            const box = img.getBoundingClientRect();
            const style = getComputedStyle(img);
            return { src: img.getAttribute("src"), natural: [img.naturalWidth, img.naturalHeight], box: [Math.round(box.width), Math.round(box.height)], fit: style.objectFit, position: style.objectPosition };
          });
          const order = Array.from(document.querySelector("main").children).map((el) => ({
            element: selector(el),
            heading: el.querySelector("h1,h2,h3")?.textContent.trim().replace(/\s+/g, " ") || "",
            top: Math.round(el.getBoundingClientRect().top + scrollY),
            height: Math.round(el.getBoundingClientRect().height),
          }));
          const h1 = document.querySelector("main h1");
          return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight, overflow, images, order, h1Hidden: !h1 || getComputedStyle(h1).display === "none" || getComputedStyle(h1).visibility === "hidden" };
        });
        const failures = [];
        if (metrics.scrollWidth > metrics.width + 2) failures.push("document overflows horizontally");
        if (metrics.overflow.length) failures.push("clipped/overflowing content: " + JSON.stringify(metrics.overflow));
        if (route === "/gallery" && metrics.images.filter((img) => img.src.includes("/photos/")).length !== 9) failures.push("gallery should contain nine photos");
        if (metrics.images.some((img) => img.src.endsWith("/home-hero.webp"))) failures.push("removed photo is still displayed");
        if (await page.locator('footer a[href="https://www.instagram.com/montessori_playschool/"]').count() !== 1) failures.push("incorrect Instagram link");
        if (metrics.images.some((img) => img.natural[0] === 0)) failures.push("broken visible image");
        if (metrics.h1Hidden) failures.push("missing accessible main heading");
        if (runtimeErrors.length) failures.push("runtime errors: " + runtimeErrors.join("; "));
        if (failures.length) issues.push({ key, failures });
        results.push({ key, ...metrics });
        await page.screenshot({ path: "mobile-review/" + key + ".jpg", type: "jpeg", quality: 60, fullPage: true, animations: "disabled" });
        if (engine === "chromium" && viewport.width === 390) {
          console.log("MOBILE_METRICS " + JSON.stringify({ key, ...metrics }));
          await screenshotStrip(browser, page, route);
          await photoSheet(browser, page, "photos-390-" + (route.slice(1) || "home"));
        }
        if (engine === "chromium" && viewport.width === 320 && ["/", "/gallery"].includes(route)) {
          await photoSheet(browser, page, "photos-320-" + (route.slice(1) || "home"));
        }
        if (engine === "chromium" && viewport.width === 844) {
          await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
          const bytes = await page.screenshot({ type: "jpeg", quality: 70, animations: "disabled" });
          console.log("MOBILE_IMAGE landscape-" + (route.slice(1) || "home") + " " + bytes.toString("base64"));
        }
      } catch (error) {
        issues.push({ key, failures: [error.message] });
      }
    }

    try {
      await loadPage(page, "/about");
      const menuButton = page.getByRole("button", { name: "Open navigation menu" });
      await menuButton.click();
      await page.locator("#mobile-navigation a").first().focus();
      await page.keyboard.press("Escape");
      assert.equal(await page.locator(".mobile-menu-button").getAttribute("aria-expanded"), "false");
      assert.equal(await page.locator(".mobile-menu-button").evaluate((el) => el === document.activeElement), true);
      await menuButton.click();
      await page.locator("header .brand").click();
      await page.waitForURL(baseURL + "/");
      assert.equal(await page.locator(".mobile-menu-button").getAttribute("aria-expanded"), "false");

      await page.goBack({ waitUntil: "networkidle" });
      await page.waitForURL(baseURL + "/about");
      assert.equal(await page.locator(".mobile-menu-button").getAttribute("aria-expanded"), "false");

      await loadPage(page, "/contact#tour");
      const placement = await page.locator("#tour").evaluate((el) => ({
        top: el.getBoundingClientRect().top,
        headerBottom: document.querySelector("header").getBoundingClientRect().bottom,
        screen: innerHeight,
      }));
      console.log("MOBILE_ANCHOR " + JSON.stringify({ engine, viewport, ...placement }));
      assert.ok(placement.top >= placement.headerBottom - 2 && placement.top < placement.screen, "tour form should land below the header and within the screen");
    } catch (error) {
      issues.push({ key: engine + "-" + viewport.width + "x" + viewport.height + "-navigation", failures: [error.message] });
    }

    if (viewport.width === 390) {
      try {
        await loadPage(page, "/enrollment");
        await page.route("**/api/inquiry", (route) => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false }) }));
        await page.locator('[name="guardian"]').fill("Test Parent");
        await page.locator('[name="email"]').fill("parent@example.com");
        await page.locator('[name="phone"]').fill("5555550100");
        await page.locator('[name="child"]').fill("Test Child");
        await page.locator('[id^="age-input-"]').fill("18 months");
        await page.locator('[name="schedule"]').first().check();
        await page.locator('[name="message"]').fill("Keep this draft");
        await page.locator('[name="smsConsent"]').check();
        await page.locator('[name="emailConsent"]').check();
        await page.getByRole("button", { name: "Send enrollment inquiry" }).click();
        await page.getByRole("alert").waitFor();
        assert.equal(await page.locator('[name="guardian"]').inputValue(), "Test Parent");
        assert.equal(await page.locator('[name="message"]').inputValue(), "Keep this draft");
        assert.equal(await page.locator('[name="schedule"]').first().isChecked(), true);
      } catch (error) {
        issues.push({ key: engine + "-form-recovery", failures: [error.message] });
      }
    }
    await context.close();
  }
  await browser.close();
}
await writeFile("mobile-review/report.json", JSON.stringify({ results, issues }, null, 2));
console.log("MOBILE_RESULTS " + JSON.stringify({ pageLayouts: results.length, issues }));
if (issues.length) process.exitCode = 1;
