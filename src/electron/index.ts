const {
    app,
    BrowserWindow,
    WebContents,
    Certificate,
    Menu,
    Tray } = require('electron');
const path = require('path')
const shell = require('electron').shell
const { dialog } = require('electron')

const dir = path.resolve(__dirname, `..`)

console.log(dir)
function makeTray(){
    const tray = new Tray(path.resolve(dir, `assets`, `IconTemplate.png`))
 
    const contextMenu = Menu.buildFromTemplate([
        {
          label: `Show Gatsby Desktop`,
          click: openMainWindow,
        },
        {
          label: `Quit...`,
          click: async (): Promise<void> => {
            openMainWindow()
            const { response } = await dialog.showMessageBox({
              message: `Quit Gatsby Desktop?`,
              detail: `This will stop all running sites`,
              buttons: [`Cancel`, `Quit`],
              defaultId: 1,
              type: `question`,
            })
    
            if (response === 1) {
              app.quit()
            }
          },
        },
      ])
      tray.setContextMenu(contextMenu)
}


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
                    shell.openExternal('https://github.com/k8-proxy/k8-proxy-desktop/issues/new')
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

function makeWindow(): typeof BrowserWindow {
    // Create the browser window.
    const tray = new Tray(path.resolve(dir, `assets`, `IconTemplate.png`))
    let window = new BrowserWindow({
    title: `k8 Proxy Desktop`,
    // //titleBarStyle: `hidden`,
    // width: 1200,
    // height: 700,
    //titleBarStyle: `hidden`,
    width: 1024,
    height: 768,
    //backgroundColor: `#452475`, // purple.80
    fullscreenable: false,
    icon:tray,
    trafficLightPosition: { x: 8, y: 18 },
    webPreferences: {
        nodeIntegrationInWorker: true,
        nodeIntegration: true,
        webSecurity: false,
        allowDisplayingInsecureContent: true,
        allowRunningInsecureContent: true
    },
    })
    //window.setIcon(path.resolve(dir, `assets`, `IconTemplate.png`));
    // load a website to display
    //window.loadURL(`file://${__dirname}/../ui/index.html`);

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
    //window.webContents.openDevTools();
    return window;

}

let mainWindow: typeof BrowserWindow | undefined

function openMainWindow(): void {
    let url = `file://${__dirname}/../ui/index.html`;

    if (!mainWindow || mainWindow.isDestroyed()) {
      mainWindow = makeWindow()
      mainWindow.loadURL(url)
    } else {
      if (!mainWindow.webContents.getURL()) {
        mainWindow.loadURL(url)
      }
    }
    // Intercept window.open/target=_blank from admin and open in browser
    // mainWindow.webContents.on(`new-window`, (event: Event, url: String) => {
    //   event.preventDefault()
    //   shell.openExternal(url)
    // })
    // mainWindow.show()
  }

app.setName("Test");
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
app.on('ready', () => {
  
  createMenu();
  makeTray();
  openMainWindow()
  
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
    makeTray();
    makeWindow()
  }
})

