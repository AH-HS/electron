const { ipcRenderer } = require('electron')

module.exports = {
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
}
