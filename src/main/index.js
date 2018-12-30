import { ipcMain,app, Menu,BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
// if (process.env.NODE_ENV === 'production') { // change !== to ===
//   require('vue-devtools').uninstall()
// }
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  Menu.setApplicationMenu(null)             //关闭菜单选项
  mainWindow = new BrowserWindow({
    height:770,//window.screen.availHeight,
    width:1350,//window.screen.availWidth,               
    useContentSize: true,
    frame: true,                     //有无边框                
    webPreferences: {webSecurity: false},  //解决跨域 
  });
  
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {     
    mainWindow = null
  });
  // Open the DevTools.
  // if (process.env.NODE_ENV === 'development') {
  //   BrowserWindow.addDevToolsExtension("C:/Users/litid/AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/4.1.5_0");
  // }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
