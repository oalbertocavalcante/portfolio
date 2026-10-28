import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium, type Page } from '@playwright/test';
import { preview } from 'astro';
import gifenc from 'gifenc';
import { PNG } from 'pngjs';
import { siteConfig } from '../src/config/site.ts';

const PORT = 4330;
const VIEWPORT = { width: 1280, height: 720 };
const SCALE = 0.75;
const SCROLL_STEP = 320;
const TRANSPARENT_INDEX = 255;
const DITHER_STRENGTH = 10;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const OUTPUT = path.resolve(import.meta.dirname, '../docs/preview.gif');

interface Frame {
  data: Uint8Array;
  width: number;
  height: number;
  delay: number;
}

const frames: Frame[] = [];

async function capture(page: Page, delay: number): Promise<void> {
  const image = PNG.sync.read(await page.screenshot());
  frames.push({
    data: new Uint8Array(image.data),
    width: image.width,
    height: image.height,
    delay,
  });
}

async function captureFor(page: Page, duration: number, interval: number): Promise<void> {
  for (let elapsed = 0; elapsed < duration; elapsed += interval) {
    await capture(page, interval);
    await page.waitForTimeout(interval);
  }
}

async function sectionTop(page: Page, section: string): Promise<number> {
  const box = await page.locator(`[data-section="${section}"]`).boundingBox();
  return box?.y ?? Number.POSITIVE_INFINITY;
}

async function tour(page: Page, baseUrl: string): Promise<void> {
  await page.goto(baseUrl);
  await captureFor(page, 4200, 150);
  await page.waitForTimeout(1200);
  await capture(page, 1600);

  const pending = new Set(['projects', 'faq']);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let offset = 0; offset < height - VIEWPORT.height; offset += SCROLL_STEP) {
    await page.mouse.wheel(0, SCROLL_STEP);
    await page.waitForTimeout(700);
    await capture(page, 260);

    if (pending.has('projects') && (await sectionTop(page, 'projects')) < 0) {
      pending.delete('projects');
      await page.mouse.move(VIEWPORT.width * 0.3, VIEWPORT.height * 0.6);
      await page.waitForTimeout(500);
      await capture(page, 1400);
      await page.mouse.move(VIEWPORT.width - 20, VIEWPORT.height / 2);
    }

    if (pending.has('faq') && (await sectionTop(page, 'faq')) < VIEWPORT.height * 0.2) {
      pending.delete('faq');
      await page.locator('[data-section="faq"] summary').nth(1).click();
      await page.waitForTimeout(500);
      await capture(page, 1400);
    }
  }
  await page.waitForTimeout(600);
  await capture(page, 1400);

  await page.locator('[data-scroll-top]').click();
  await captureFor(page, 1500, 150);
  await page.waitForTimeout(400);
  await capture(page, 900);

  await page.locator('[data-theme-toggle]').first().click();
  await page.waitForTimeout(600);
  await capture(page, 1800);

  await Promise.all([
    page.waitForURL(/\/en\//),
    page.locator('[data-language-link]').first().click(),
  ]);
  await page.waitForTimeout(5500);
  await capture(page, 2200);
}

function dither(frame: Frame): Uint8Array {
  const output = new Uint8Array(frame.data.length);
  for (let y = 0; y < frame.height; y += 1) {
    for (let x = 0; x < frame.width; x += 1) {
      const offset = (y * frame.width + x) * 4;
      const threshold = BAYER[(y % 4) * 4 + (x % 4)] ?? 0;
      const shift = (threshold / 16 - 0.5) * DITHER_STRENGTH;
      for (let channel = 0; channel < 3; channel += 1) {
        output[offset + channel] = Math.min(
          255,
          Math.max(0, (frame.data[offset + channel] ?? 0) + shift),
        );
      }
      output[offset + 3] = 255;
    }
  }
  return output;
}

function encode(): Uint8Array {
  const sample = new Uint8Array(frames.reduce((total, frame) => total + frame.data.length / 16, 0));
  let cursor = 0;
  for (const frame of frames) {
    for (let pixel = 0; pixel < frame.data.length; pixel += 64) {
      sample.set(frame.data.subarray(pixel, pixel + 4), cursor);
      cursor += 4;
    }
  }

  const palette = gifenc.quantize(sample.subarray(0, cursor), TRANSPARENT_INDEX);
  const colorTable = [...palette];
  while (colorTable.length <= TRANSPARENT_INDEX) colorTable.push([0, 0, 0]);

  const encoder = gifenc.GIFEncoder();
  let previous: Uint8Array | undefined;
  for (const frame of frames) {
    const index = gifenc.applyPalette(dither(frame), palette);
    const output = previous ? index.slice() : index;
    if (previous) {
      for (let pixel = 0; pixel < index.length; pixel += 1) {
        if (index[pixel] === previous[pixel]) output[pixel] = TRANSPARENT_INDEX;
      }
    }
    encoder.writeFrame(output, frame.width, frame.height, {
      ...(previous ? {} : { palette: colorTable, repeat: 0 }),
      delay: frame.delay,
      transparent: Boolean(previous),
      transparentIndex: TRANSPARENT_INDEX,
      dispose: 1,
    });
    previous = index;
  }
  encoder.finish();
  return encoder.bytes();
}

const server = await preview({ logLevel: 'error', server: { host: '127.0.0.1', port: PORT } });
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: SCALE });
  await tour(await context.newPage(), `http://127.0.0.1:${PORT}${siteConfig.base}/`);
} finally {
  await browser.close();
  await server.stop();
}

await mkdir(path.dirname(OUTPUT), { recursive: true });
const bytes = encode();
await writeFile(OUTPUT, bytes);
console.log(
  `${frames.length} quadros, ${(bytes.length / 1024 / 1024).toFixed(1)} MB em ${path.relative(process.cwd(), OUTPUT)}`,
);
