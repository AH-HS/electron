'use strict'

const builder = require('electron-builder')
const Platform = builder.Platform

// Promise is returned
builder
    .build({
        targets: Platform.WINDOWS.createTarget(),
        config: {
            appId: 'com.example.app',
            productName: 'scrirpt 打包', // 打包后的文件名
            files: ['page/**/*', 'electron/**/*'],
            win: {
                target: ['portable', 'nsis'],
            },
            //  see https://goo.gl/QQXmcV',
        },
    })
    .then(() => {
        // handle result
    })
    .catch(error => {
        // handle error
    })
