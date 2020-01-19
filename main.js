const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');
const path = require('path');
/*const storage = require('electron-json-storage');
const defaultDataPath = storage.getDefaultDataPath();
saveData();*/

let mainWindow, colorWin = null;

// require('electron-reload')(__dirname);

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 250,
        height: 325,
        frame: false,
        maximizable: false,
        resizable: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, 'nodeIntegrations/preload.js')
            // nodeIntegration: true
        }
    })
    mainWindow.loadFile('./app/html/index.html');
    /*mainWindow.webContents.openDevTools({
        mode: "detach"
    });*/

    mainWindow.on('closed', function () {
        mainWindow = null
    })
    ipcMain.on("test", (event, data) => {
        colorWindow(...data);
    });
    ipcMain.on('colorUpdated', (event, color) => {
        mainWindow.webContents.send('getColor', color);
    });
}

function colorWindow(x, y) {
    if (colorWin)
        colorWin.close();
    // 
    colorWin = new BrowserWindow({
        width: 80,
        height: 80,
        frame: false,
        maximizable: false,
        resizable: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, 'nodeIntegrations/picker.js')
            // nodeIntegration: true
        }
    })
    colorWin.setPosition(x - 25, y - 25);
    ipcMain.on("moved", (event, data) => {
        colorWin.setPosition(data[0], data[1]);
    });
    // 
    colorWin.loadFile('./app/html/picker.html');
    // 
    colorWin.on('closed', function () {
        colorWin = null;
    })
    /*colorWin.webContents.openDevTools({
        mode: "detach"
    });*/
}
// 
function saveData(data) {

    /*storage.set('foobar', data, function (error) {
        if (error) throw error;
    });*/
}
// 
app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})