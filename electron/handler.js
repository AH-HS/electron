const { ipcMain } = require("electron");

ipcMain.handle("read-database", async (event, query) => {
    return fetchDataFromDatabase(query);
});
