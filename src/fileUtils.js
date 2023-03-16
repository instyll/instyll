const { ipcRenderer } = require('electron');

async function getFilesInDirectory(directory) {
    const files = await ipcRenderer.invoke('getFilesInDirectory', directory);
    // console.log(files);
    // if (!Array.isArray(files)) {
    //   return [];
    // }
    // console.log('Files in directory:', files);
    // console.log(typeof files);
    console.log(Array.from(files));
    return files;
  }

module.exports = {
  getFilesInDirectory,
};