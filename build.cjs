const fs = require('fs').promises;
const path = require('path');

async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await fs.copyFile(srcPath, destPath);
    }
}

const sourceDirectory = `${__dirname}/static`;
const destinationDirectory = `${__dirname}/dist/static`;

async function copyOtherAssets(){
    await fs.copyFile(`${__dirname}/package.json`, `${__dirname}/dist/package.json`);
    await fs.copyFile(`${__dirname}/index.html`, `${__dirname}/dist/index.html`);
    await fs.copyFile(`${__dirname}/app.js`, `${__dirname}/dist/app.js`);
}

copyDir(sourceDirectory, destinationDirectory)
    .then(() => copyOtherAssets())
    .then(() => console.log('Build finished successfully'))
    .catch(console.error);



