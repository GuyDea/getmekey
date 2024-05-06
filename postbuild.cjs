const fs = require('fs').promises;
const path = require('path');
const {execSync} = require("child_process");

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

function formatDateTime (date){
    const year = date.getUTCFullYear().toString().substr(-2),
        month = ('0' + (date.getUTCMonth() + 1)).slice(-2),
        day = ('0' + date.getUTCDate()).slice(-2),
        hours = ('0' + date.getUTCHours()).slice(-2),
        minutes = ('0' + date.getUTCMinutes()).slice(-2),
        seconds = ('0' + date.getUTCSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
}

async function copyOtherAssets(){
    await fs.copyFile(`${__dirname}/package.json`, `${__dirname}/dist/package.json`);
    await fs.copyFile(`${__dirname}/index.html`, `${__dirname}/dist/index.html`);
    await fs.copyFile(`${__dirname}/manifest.json`, `${__dirname}/dist/manifest.json`);
    await fs.copyFile(`${__dirname}/sw.js`, `${__dirname}/dist/sw.js`);
}

const sourceDirectory = `${__dirname}/static`;
const destinationDirectory = `${__dirname}/dist/static`;

async function addVersion() {
    const revision = execSync('git rev-parse --short HEAD').toString().trim();
    const metaContent = await fs.readFile(`${__dirname}/dist/src/meta.js`, 'utf8');
    let replaced = metaContent
        .replaceAll('{{APP_VERSION}}', process.env.npm_package_version)
        .replaceAll('{{GIT_COMMIT_ID}}', revision)
        .replaceAll('{{BUILD_AT}}', formatDateTime(new Date()));
    await fs.writeFile(`${__dirname}/dist/src/meta.js`,replaced,{encoding:'utf8',flag:'w'});
}

async function listFilesRecursive(dir, relativeDir = '') {
    let results = [];
    const directoryPath = path.join(dir, relativeDir);

    const files = await fs.readdir(directoryPath);

    for (let file of files) {
        const fullPath = path.join(directoryPath, file);
        const relativePath = path.join(relativeDir, file);
        const stat = await fs.stat(fullPath);

        if (stat && stat.isDirectory()) {
            results = results.concat(await listFilesRecursive(dir, relativePath));
        } else {
            results.push(relativePath);
        }
    }
    return results;
}

async function setupSW() {
    const folders = ['lib', 'src', 'static'];
    let files = [];
    for (const f of folders) {
        files = files.concat(await listFilesRecursive(`${__dirname}/dist/`, `${f}`))
    }
    files.push('index.html');
    const swContent = await fs.readFile(`${__dirname}/dist/sw.js`, 'utf8');
    let replaced = swContent
        .replaceAll('INJECT_ASSETS_TO_PRELOAD', files.map(f => `'${f}'`).join(',\n'))
        .replaceAll('INJECT_TIMESTAMP', new Date().getTime().toString())
    ;

    await fs.writeFile(`${__dirname}/dist/sw.js`,replaced,{encoding:'utf8',flag:'w'});
}

copyDir(sourceDirectory, destinationDirectory)
    .then(() => copyDir(`${__dirname}/lib`, `${__dirname}/dist/lib`))
    .then(() => copyOtherAssets())
    .then(() => addVersion())
    .then(() => setupSW())
    .then(() => console.log('Build finished successfully'))
    .catch(console.error);



