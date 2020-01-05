const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');
const path = require('path');

let mainWindow, colorWin;

require('electron-reload')(__dirname);

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 250,
        height: 325,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, 'nodeIntegrations/preload.js')
            // nodeIntegration: true
        }
    })
    mainWindow.loadFile('./app/html/index.html');
    mainWindow.webContents.openDevTools({
        mode: "detach"
    });

    mainWindow.on('closed', function () {
        mainWindow = null
    })
    ipcMain.on("test", () => {
        colorWindow();
    });
}

function colorWindow() {
    colorWin = new BrowserWindow({
        width: 90,
        height: 90,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, 'nodeIntegrations/retard.js')
            // nodeIntegration: true
        }
    })
    ipcMain.on("moved", (event, data) => {
        colorWin.setPosition(data[0], data[1]);
    });
    colorWin.loadFile('./app/html/fuck.html');
    colorWin.webContents.openDevTools({
        mode: "detach"
    });
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})