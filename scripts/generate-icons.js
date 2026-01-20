const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const ROOT = path.resolve(__dirname, '..');
const RES_DIR = path.join(ROOT, 'android', 'app', 'src', 'main', 'res');

const SIZES = [
    { name: 'mdpi', size: 48 },
    { name: 'hdpi', size: 72 },
    { name: 'xhdpi', size: 96 },
    { name: 'xxhdpi', size: 144 },
    { name: 'xxxhdpi', size: 192 }
];

const COLORS = {
    background: { r: 15, g: 23, b: 42, a: 255 },
    star: { r: 251, g: 191, b: 36, a: 255 }
};

function pointInPolygon(x, y, points) {
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const xi = points[i].x;
        const yi = points[i].y;
        const xj = points[j].x;
        const yj = points[j].y;
        const intersect = ((yi > y) !== (yj > y)) &&
            (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
}

function starPoints(size) {
    const cx = size / 2;
    const cy = size / 2;
    const outer = size * 0.36;
    const inner = size * 0.16;
    const points = [];
    for (let i = 0; i < 10; i += 1) {
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        const radius = i % 2 === 0 ? outer : inner;
        points.push({
            x: cx + Math.cos(angle) * radius,
            y: cy + Math.sin(angle) * radius
        });
    }
    return points;
}

function setPixel(png, x, y, color) {
    const idx = (png.width * y + x) << 2;
    png.data[idx] = color.r;
    png.data[idx + 1] = color.g;
    png.data[idx + 2] = color.b;
    png.data[idx + 3] = color.a;
}

function renderIcon(size, { withBackground, roundMask }) {
    const png = new PNG({ width: size, height: size });
    const points = starPoints(size);
    const radius = size / 2;

    for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
            if (roundMask) {
                const dx = x + 0.5 - radius;
                const dy = y + 0.5 - radius;
                if ((dx * dx + dy * dy) > radius * radius) {
                    setPixel(png, x, y, { r: 0, g: 0, b: 0, a: 0 });
                    continue;
                }
            }
            const inStar = pointInPolygon(x + 0.5, y + 0.5, points);
            if (inStar) {
                setPixel(png, x, y, COLORS.star);
            } else if (withBackground) {
                setPixel(png, x, y, COLORS.background);
            } else {
                setPixel(png, x, y, { r: 0, g: 0, b: 0, a: 0 });
            }
        }
    }
    return png;
}

function writeIcon(dirName, fileName, png) {
    const dir = path.join(RES_DIR, `mipmap-${dirName}`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const target = path.join(dir, fileName);
    fs.writeFileSync(target, PNG.sync.write(png));
}

function generateIcons() {
    SIZES.forEach((item) => {
        const foreground = renderIcon(item.size, { withBackground: false, roundMask: false });
        const launcher = renderIcon(item.size, { withBackground: true, roundMask: false });
        const round = renderIcon(item.size, { withBackground: true, roundMask: true });
        writeIcon(item.name, 'ic_launcher_foreground.png', foreground);
        writeIcon(item.name, 'ic_launcher.png', launcher);
        writeIcon(item.name, 'ic_launcher_round.png', round);
    });
}

generateIcons();
console.log('Android icons generated.');
