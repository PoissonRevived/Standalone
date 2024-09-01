const {app, BrowserWindow, dialog, Menu} = require('electron');
const isDev = require('electron-is-dev');

//const {app, BrowserWindow} = require('electron');
const path = require('path');

if (process.platform === 'linux') {
  app.commandLine.appendSwitch('no-sandbox');
}

let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'flash/pepflashplayer32_32_0_0_303.dll'
    break
  case 'darwin':
    pluginName = 'flash/PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'flash/libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName));


/*function clearCache() {
  mainWindow.webContents.session.clearCache();
*/

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "Connecting...",
    icon: __dirname + '/favicon.ico',
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js'),
      plugins: true
    }
  });
  mainWindow.maximize();

  mainWindow.setMenu(null);
  //clearCache();
  mainWindow.loadURL('https://play.poissonrevived.net');
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});


//setInterval(clearCache, 1000*60*5);
