const { ipcRenderer } = require('electron');

async function getFilesInDirectory(directory) {
    const files = await ipcRenderer.invoke('getFilesInDirectory', directory);
    // console.log(Array.from(files));
    return files;
  }

module.exports = {
  getFilesInDirectory,
};