import fs from 'node:fs';
import path from 'node:path';

export interface ImageSize {
  width: number;
  height: number;
}

const cache = new Map<string, ImageSize | null>();

/**
 * Reads the intrinsic dimensions of an image in /public.
 *
 * Server-only, and only called during static generation — the case study
 * layout needs to know whether a screenshot is a phone portrait or a desktop
 * capture so it can pick a frame that fits instead of cropping it.
 * Supports PNG and JPEG; anything else returns null (callers fall back to 16:9).
 */
export function getImageSize(publicPath: string): ImageSize | null {
  if (cache.has(publicPath)) return cache.get(publicPath) ?? null;

  let size: ImageSize | null = null;
  try {
    const file = path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''));
    const buf = fs.readFileSync(file);
    size = readPng(buf) ?? readJpeg(buf);
  } catch {
    size = null;
  }

  cache.set(publicPath, size);
  return size;
}

function readPng(buf: Buffer): ImageSize | null {
  const isPng =
    buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47 && buf.toString('ascii', 12, 16) === 'IHDR';
  if (!isPng) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function readJpeg(buf: Buffer): ImageSize | null {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return null;

  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buf[offset + 1];
    // SOF0–SOF15, skipping the non-frame markers in that range
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    }
    offset += 2 + buf.readUInt16BE(offset + 2);
  }
  return null;
}
