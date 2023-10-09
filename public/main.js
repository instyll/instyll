const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
const path = require('path');
const { ipcMain } = require('electron');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
            width: 900, height: 680,
            icon: __dirname + '/icons/key500.png',
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
    mainWindow.loadURL(isDev ? 'http://localhost:3000': `file://${path.join(__dirname, 
   '../build/index.html')}`);

    app.setAboutPanelOptions({
        applicationName: "instyll",
        applicationVersion: "0.0.1",
    })

    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {app.quit();}
});

app.on('activate', () => {
    if (mainWindow === null) {createWindow();}
});

ipcMain.handle('getFilesInDirectory', (event, directory) => {
    const files = fs.readdirSync(directory);
    return files.filter(file => fs.statSync(`${directory}/${file}`).isFile());
});
