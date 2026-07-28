#!/usr/bin/env python3
"""Generate favicon assets: flat front-face 3x3 Rubik's cube grid."""

import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public"

BG = (0, 0, 0, 255)
# Matches COLOR_TABLE in src/three-app.js
COLORS = {
    "U": (0, 0, 255, 255),  # blue
    "D": (0, 128, 0, 255),  # green
    "L": (255, 0, 0, 255),  # red
    "R": (255, 140, 0, 255),  # darkorange
    "F": (255, 255, 0, 255),  # yellow
    "B": (248, 248, 255, 255),  # ghostwhite
}

# Front-face scramble using the app palette (no ghostwhite/back stickers).
GRID = [
    ["D", "U", "R"],
    ["F", "L", "D"],
    ["U", "R", "F"],
]

GAP = 1
CELL = 8


def sticker_rects(size, *, fill=False):
    inset, cell, gap = layout_fill(size) if fill else layout(size)
    stickers = []
    for row in range(3):
        for col in range(3):
            x = inset + col * (cell + gap)
            y = inset + row * (cell + gap)
            stickers.append((GRID[row][col], (x, y, cell, cell)))
    return stickers


def rgba_hex(color):
    r, g, b, _a = color
    return f"#{r:02x}{g:02x}{b:02x}"


def write_svg(stickers, path):
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Rubik\'s cube">',
        '  <rect width="32" height="32" fill="#000000"/>',
        "  <g>",
    ]
    for key, (x, y, w, h) in stickers:
        lines.append(
            f'    <rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{rgba_hex(COLORS[key])}"/>'
        )
    lines.extend(["  </g>", "</svg>", ""])
    path.write_text("\n".join(lines), encoding="utf-8")


def layout(size):
    gap = max(1, round(GAP * size / 32))
    cell = round(CELL * size / 32)
    used = 3 * cell + 2 * gap
    inset = (size - used) // 2
    return inset, cell, gap


def layout_fill(size):
    """Edge-to-edge grid for larger touch icons."""
    gap = max(1, round(size / 32))
    cell = (size - 2 * gap) // 3
    inset = (size - (3 * cell + 2 * gap)) // 2
    return inset, cell, gap


def render(size, *, fill=False):
    inset, cell, gap = layout_fill(size) if fill else layout(size)
    pixels = [[BG for _ in range(size)] for _ in range(size)]

    for row in range(3):
        for col in range(3):
            x0 = inset + col * (cell + gap)
            y0 = inset + row * (cell + gap)
            x1 = x0 + cell
            y1 = y0 + cell
            color = COLORS[GRID[row][col]]
            for y in range(y0, y1):
                for x in range(x0, x1):
                    pixels[y][x] = color
    return pixels


def png_bytes(pixels):
    size = len(pixels)
    raw = b""
    for row in pixels:
        raw += b"\x00" + b"".join(bytes(p) for p in row)

    def chunk(tag, data):
        c = tag + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )


def write_ico(path, sizes):
    images = [(size, png_bytes(render(size, fill=True))) for size in sizes]
    offset = 6 + 16 * len(images)
    ico = struct.pack("<HHH", 0, 1, len(images))
    for size, png in images:
        dimension = size if size < 256 else 0
        ico += struct.pack(
            "<BBBBHHII", dimension, dimension, 0, 0, 0, 0, len(png), offset
        )
        offset += len(png)
    ico += b"".join(png for _, png in images)
    path.write_bytes(ico)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    write_svg(sticker_rects(32, fill=True), OUT / "favicon.svg")
    (OUT / "apple-touch-icon.png").write_bytes(png_bytes(render(180, fill=True)))
    write_ico(OUT / "favicon.ico", [16, 32])
    print("Generated favicon assets in", OUT)


if __name__ == "__main__":
    main()
