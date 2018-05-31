const electron = require('electron');

const {app, BrowserWindow, Tray, nativeImage} = require('electron')
var path = require('path');

var win;
var tray;

var isTrayMade = false;

var windowSpecifics = {
    width: 800, 
    height: 600,
    title: "Piazza",
    frame: true,
    icon: __dirname + "/images/piazza.ico"
}

function createWindow () {
    win = new BrowserWindow(windowSpecifics)
    win.setMenu(null)

    win.loadFile('index.html')

    loadTray()
  
    win.on('closed', (e) => {
        win = null
    })

    win.on('show', () => {
        tray.setHighlightMode('always')
    })
  
    win.on('hide', () => {
        tray.setHighlightMode('never')
    })

}

function loadTray() {
    if (!isTrayMade) {
        const iconPath = path.join(__dirname, '/images/piazza.ico');
        tray = new Tray(nativeImage.createFromPath(iconPath));
        isTrayMade = true;
    }
  
    tray.on('click', () => {
        if (win === null) {
            createWindow();
        } else {
            win.isVisible() ? win.hide() : win.show()
        }
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', (e) => {
    app.quit()
})


 