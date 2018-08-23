import { app, ipcMain, BrowserWindow } from 'electron';
import * as path from 'path';

export class Main {
  mainWindow: BrowserWindow = null;

  constructor(
    private app: Electron.App
  ){
    this.app.on('window-all-closed', () => this.onWindowAllClosed()); 
    this.app.on('ready', () => this.onReady()); 
    this.app.on('activate', () => this.onActivate()); 
  }

  onWindowAllClosed() {
    this.app.quit();
  }

  onReady() {
    this.createWindow();
  }

  onActivate() {
    if (this.mainWindow === null) {
      this.createWindow();
    }
  }

  createWindow() {
    let windowOption = {
      width: 500,
      height: 500
    }

    let loadUrl = 'file://' + path.resolve(__dirname, '../renderer-process/index.html');

    if (process.env.NODE_ENV === 'development' && process.env.NG_SERVER === 'true') {
      // ng serveを使用している場合
      loadUrl = 'http://localhost:4200';
    }

    this.mainWindow = new BrowserWindow(windowOption);
    this.mainWindow.loadURL(loadUrl);


    this.mainWindow.on('closed', () => {
      console.log('closed');
      this.mainWindow = null;
    });
  }
}

new Main(app);
