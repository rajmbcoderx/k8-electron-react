const { app, BrowserWindow, WebContents, Certificate } = require('electron');

/*
TO sync changes
const electron = require('electron');
const path = require('path');

// the first argument can be: a file, directory or glob pattern
require('electron-reload')(__dirname + '../ui/index.html', {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
*/

app.on('ready', () => {
  const window = new BrowserWindow({ width: 1200, height: 700 });

  window.setMenuBarVisibility(null);

  // load a website to display
  window.loadURL(`file://${__dirname}/../ui/index.html`);
  
  //to add chrome dev tools 
  //window.webContents.openDevTools();

});

app.on('certificate-error', (event:Event, webContents:WebContents, url:URL, error: string, certificate:Certificate, callback:Function) => {
 
  if (url === 'https://forensic-workbench.com/') {
    // Verification logic.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})

