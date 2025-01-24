const Database = require('better-sqlite3')
const { app } = require('electron')
const { readdir } = require('fs/promises')
const path = require('path')
const userDataPath = app.getPath('appData')
const dbPath = path.join(userDataPath, 'sqliteDatabase.db')

let db

const createTable = async (db, table) => {
    const { name, fields } = table
    const sql = `CREATE TABLE IF NOT EXISTS ${name} (${fields})`
    db.prepare(sql).run()
}

const sqQuery = async param => {
    const rows = db.prepare('SELECT * FROM users').all()
    return rows
}

const sqInsert = async param => {
    try {
        if (Array.isArray(param)) {
            db.prepare('INSERT INTO users (name) VALUES (?)').all(param.name)
        } else {
            db.prepare('INSERT INTO users (name) VALUES (?)').run(param.name)
        }
    } catch (error) {
        console.log({ error })
        return false
    }
    return true
}

const sqUpdate = async param => {
    console.log('更新', { param, db })
    return param
}

const sqDelete = async param => {
    console.log('删除', { param, db })
    return param
}

module.exports = {
    sqQuery,
    sqInsert,
    sqUpdate,
    sqDelete,
}

module.exports.dbInit = async (failpath = dbPath) => {
    db = new Database(failpath, { verbose: console.log })
}
