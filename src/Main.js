const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 650,
        minWidth: 400,
        minHeight: 650,
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'js/Preload.js')
        }
    })

    win.loadFile('src/html/index.html')

    ipc.on("closeApp", () => {
        win.close();
    })

    ipc.on("minimizeApp", () => {
        win.minimize();
    })

    ipc.on("maximizeRestoreApp", () => {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    })

    win.on("maximize", () => {
        win.webContents.send("isMaximized");
    })

    win.on("unmaximize", () => {
        win.webContents.send("isMinimized");
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})