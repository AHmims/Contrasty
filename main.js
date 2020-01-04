const {
    app,
    BrowserWindow
} = require('electron');
const path = require('path');

let mainWindow;

require('electron-reload')(path.join(__dirname, "app"));

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        /*webPreferences: {
              preload: path.join(__dirname, 'preload.js')
        }*/
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