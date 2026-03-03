const fs = require('fs');
const path = require('path');

const srcFiles = [
    "C:\\Users\\harsh\\Downloads\\4k-Magellanic-Penguins-Pair-Falkland-Islands-Wallpaper.jpg",
    "C:\\Users\\harsh\\Downloads\\thumb-1920-1189660.jpg",
    "C:\\Users\\harsh\\Downloads\\236708.jpg",
    "C:\\Users\\harsh\\Downloads\\1391067.jpg",
    "C:\\Users\\harsh\\Downloads\\406071.jpg",
    "C:\\Users\\harsh\\Downloads\\pixel-art-rural-landscape-background_52683-125379.avif",
    "C:\\Users\\harsh\\Downloads\\4k-Retro-Pixel-Art-AI-Generated-4K-Wallpaper-1.jpg",
    "C:\\Users\\harsh\\Downloads\\kali-ascii.png"
];

const destDir = "c:\\Users\\harsh\\desktop\\Desktop\\PORTFOLIO\\public\\wallpapers";

try {
    const existingFiles = fs.readdirSync(destDir);
    for (const file of existingFiles) {
        if (file === '.' || file === '..') continue;
        fs.unlinkSync(path.join(destDir, file));
    }
    console.log('Cleared existing wallpapers.');
} catch (e) {
    console.log('Error clearing directory:', e.message);
}

for (const file of srcFiles) {
    try {
        const destPath = path.join(destDir, path.basename(file));
        fs.copyFileSync(file, destPath);
        console.log(`Copied ${path.basename(file)}`);
    } catch (e) {
        console.log(`Failed to copy ${file}:`, e.message);
    }
}
