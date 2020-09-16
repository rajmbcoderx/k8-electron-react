const { app,  BrowserWindow, WebContents, Certificate } = require('electron');

app.on('ready', () => {
  const window = new BrowserWindow({ width: 1200, height: 700 });

  window.setMenuBarVisibility(null);

  // load a website to display
  window.loadURL(`file://${__dirname}/../ui/index.html`);
  
  //to add chrome dev tools 
  //window.webContents.openDevTools();

});

app.on('certificate-error', (event: Event, contents: typeof WebContents, url: String, error: String, certificate:  typeof Certificate, callback: Function) => {
  if (url === 'https://forensic-workbench.com/') {
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})

