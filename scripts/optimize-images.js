/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
/* eslint-enable @typescript-eslint/no-require-imports */


const inputDir = "./public";
const formats = [".jpg", ".jpeg", ".png", ".gif"];

function optimizeImage(filePath) {
  const outputPath = filePath.replace(path.extname(filePath), ".webp");
  sharp(filePath)
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => console.log(`✅ Optimized: ${outputPath}`))
    .catch(console.error);
}

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath);
    else if (formats.includes(path.extname(file).toLowerCase())) optimizeImage(fullPath);
  }
}

walk(inputDir);

