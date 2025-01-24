// preload.js
const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

contextBridge.exposeInMainWorld('sqlite', {
    stmt: 123,
    sqQuery: param => {
        return ipcRenderer.invoke('sqQuery', param)
    },
    sqInsert: param => {
        return ipcRenderer.invoke('sqInsert', param)
    },
    sqUpdate: param => {
        return ipcRenderer.invoke('sqUpdate', param)
    },
    sqDelete: param => {
        return ipcRenderer.invoke('sqDelete', param)
    },
})