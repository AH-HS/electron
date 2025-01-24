const { ipcMain } = require('electron')
const { sqQuery, sqInsert, sqUpdate, sqDelete, dbInit } = require('../db')

const dbMain = async () => {
    await dbInit()
    ipcMain.handle('sqQuery', (event, param) => {
        return sqQuery(param)
    })
    ipcMain.handle('sqInsert', (event, param) => {
        return sqInsert(param)
    })
    ipcMain.handle('sqUpdate', (event, param) => {
        return sqUpdate(param)
    })
    ipcMain.handle('sqDelete', (event, param) => {
        return sqDelete(param)
    })
}

module.exports.mainInit = async () => {
    await dbMain()
}
