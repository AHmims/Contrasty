const {
    app,
    BrowserWindow
} = require('electron');
const path = require('path');

let mainWindow;

require('electron-reload')(__dirname);

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 250,
        height: 325,
        frame: false,
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
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})