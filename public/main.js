const electron = require('electron');
const dotenv = require("dotenv");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
const path = require('path');
const { ipcMain, dialog } = require('electron');
const fs = require('fs');

require('@electron/remote/main').initialize()

dotenv.config();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
            width: 900, height: 680,
            icon: __dirname + '/icons/key500.png',
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });
    mainWindow.loadURL(isDev ? 'http://localhost:3000': `file://${path.join(__dirname, 
   '../build/index.html')}`);

   mainWindow.once('ready-to-show', () => {
        mainWindow.show();
   });

   mainWindow.setMenuBarVisibility(false)

   ipcMain.on('select-folder', (event) => {
    const folderPath = dialog.showOpenDialogSync(mainWindow, {
      properties: ['openDirectory'],
    });

    event.returnValue = folderPath ? folderPath[0] : null;
  });

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

ipcMain.on('file-request', (event) => {  
    // If the platform is 'win32' or 'Linux'
    if (process.platform !== 'darwin') {
      // Resolves to a Promise<Object>
      dialog.showOpenDialog({
        title: 'Select the File to be uploaded',
        defaultPath: path.join(__dirname, '../assets/'),
        buttonLabel: 'Upload',
        // Restricting the user to only Text Files.
        filters: [ 
        { 
           name: 'Text Files', 
           extensions: ['txt', 'docx'] 
        }, ],
        // Specifying the File Selector Property
        properties: ['openFile']
      }).then(file => {
        // Stating whether dialog operation was
        // cancelled or not.
        console.log(file.canceled);
        if (!file.canceled) {
          const filepath = file.filePaths[0].toString();
          console.log(filepath);
          event.reply('file', filepath);
        }  
      }).catch(err => {
        console.log(err)
      });
    }
    else {
      // If the platform is 'darwin' (macOS)
      dialog.showOpenDialog({
        title: 'Select the File to be uploaded',
        defaultPath: path.join(__dirname, '../assets/'),
        buttonLabel: 'Upload',
        filters: [ 
        { 
           name: 'Text Files', 
           extensions: ['txt', 'docx'] 
        }, ],
        // Specifying the File Selector and Directory 
        // Selector Property In macOS
        properties: ['openFile', 'openDirectory']
      }).then(file => {
        console.log(file.canceled);
        if (!file.canceled) {
        const filepath = file.filePaths[0].toString();
        console.log(filepath);
        event.send('file', filepath);
      }  
    }).catch(err => {
        console.log(err)
      });
    }
  });
