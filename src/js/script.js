const { ipcRenderer } = require("electron");
const maxRestoreBtn = document.getElementById("maxRestoreBtn");
const ipc = ipcRenderer

// close app
closeBtn.addEventListener("click", () => {
    ipc.send("closeApp");
})

// minimize app
minimizeBtn.addEventListener("click", () => {
    ipc.send("minimizeApp");
})

// maximize app
maxRestoreBtn.addEventListener("click", () => {
    ipc.send("maximizeRestoreApp");
})

function changeMaximize(isMaximized) {
    if (isMaximized) {
        maxRestoreBtn.classList.remove("maximizeBtn");
        maxRestoreBtn.classList.add("restoreBtn");
    } else {
        maxRestoreBtn.classList.remove("restoreBtn");
        maxRestoreBtn.classList.add("maximizeBtn");
    }
}

ipc.on("isMaximized", () => { changeMaximize(true) })
ipc.on("isMinimized", () => { changeMaximize(false) })