const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const filesToCopy = ['index.html', 'script.js', 'style.css'];

if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

filesToCopy.forEach((fileName) => {
    const srcPath = path.join(rootDir, fileName);
    if (!fs.existsSync(srcPath)) {
        throw new Error(`Missing source file: ${fileName}`);
    }
    fs.copyFileSync(srcPath, path.join(distDir, fileName));
});

console.log('Build complete: dist/');
