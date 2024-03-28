const fs = require('fs').promises;
const path = require('path');

async function clearDirectoryExcept(directoryPath, keepFiles) {
    try {
        const items = await fs.readdir(directoryPath);
        for (const item of items) {
            if (!keepFiles.includes(item)) {
                const fullPath = path.join(directoryPath, item);
                const stat = await fs.lstat(fullPath);
                if (stat.isDirectory()) {
                    // Recursively clear the directory
                    await clearDirectoryExcept(fullPath, []);
                    // Remove the now-empty directory
                    await fs.rmdir(fullPath);
                } else {
                    // If it's a file, delete it
                    await fs.unlink(fullPath);
                }
            }
        }
    } catch (error) {
        console.error('Error clearing directory:', error);
    }
}

const directoryPath = `${__dirname}/dist`;
const keepFiles = ['index.html'];
clearDirectoryExcept(directoryPath, keepFiles)
    .then(() => console.log(`Directory "/dist" cleared except for index.html`))
    .catch(console.error);


