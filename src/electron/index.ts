const { app,  BrowserWindow, WebContents, Certificate, Menu } = require('electron');
const path = require('path')
const shell = require('electron').shell
const { dialog } = require('electron')

function createMenu(){
  var template =[
    {
        label: 'Desktop'
    },
    {
        label: 'K8-Proxy-Desktop',
        submenu: [
            {
                label:'About k8 Proxy Desktop'
            },
            {
                label:'Report an issue',
                click() { 
                    shell.openExternal('http://coinmarketcap.com')
                } ,
                accelerator: 'CmdOrCtrl+Shift+I'
            },
            {type:'separator'}, 
            {
                label:'Exit',
                click() { 
                    app.quit() 
                }
          }
        ]
    },
    {
       role: 'help',
       submenu: [
          {
             label: 'Learn More',
             click() { 
                shell.openExternal(' https://github.com/k8-proxy/k8-proxy-desktop')
            } ,
            accelerator: 'CmdOrCtrl+Shift+L'
            
          }
       ]
    }
]
console.log(app.getName())
if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName()
    })
}

 const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)


}

function showAlert(response: String){
    const options = {
        type: 'question',
        buttons: ['Cancel', 'Yes, please', 'No, thanks'],
        defaultId: 2,
        title: 'Question',
        message: 'Do you want to do this?',
        detail: 'It does not really matter',
        checkboxLabel: 'Remember my answer',
        checkboxChecked: true,
      };
    
        
      dialog.showMessageBox(null, options, (response: String, checkboxChecked: any) => {
        //console.log(response);
        console.log(checkboxChecked);
      });
}

function createWindow () {
    // Create the browser window.
    let window = new BrowserWindow({
    title: `k8 Proxy Desktop`,
    //titleBarStyle: `hidden`,
    width: 1200,
    height: 700,
    trafficLightPosition: { x: 8, y: 18 },
    webPreferences: {
        nodeIntegrationInWorker: true,
        nodeIntegration: true,
        webSecurity: false,
        allowDisplayingInsecureContent: true,
        allowRunningInsecureContent: true
    },
    })
    // load a website to display
    window.loadURL(`file://${__dirname}/../ui/index.html`);

    // window.once('ready-to-show', () => {

    //     window.show()
    //     window.focus()
    // })
    // // Emitted when the window is closed.
    // window.on('closed', function () {
    // // Dereference the window object, usually you would store windows
    // // in an array if your app supports multi windows, this is the time
    // // when you should delete the corresponding element.
    // window = null
    // })
    //to add chrome dev tools 
    window.webContents.openDevTools();

}

app.setName("Anish");
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
app.on('ready', () => {
  
  createMenu();
  createWindow()
  console.log("process" + process.platform + "," +  app.getName())
});


app.on('certificate-error', (event: Event, contents: typeof WebContents, url: String, error: String, certificate:  typeof Certificate, callback: Function) => {
  if (url === 'https://forensic-workbench.com/') {
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

