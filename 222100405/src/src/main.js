'use strict';

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow;

var path = require('path');
var url = require('url');

function createWindow() {
    var win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    var indexPath = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });

    win.loadURL(indexPath);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// ����ļ�������һ�� Electron ���ڲ�����������Ŀ�� index.html �ļ���