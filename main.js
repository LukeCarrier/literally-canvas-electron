var app           = require("app"),
    BrowserWindow = require("browser-window");

require("crash-reporter").start({
    submitUrl: "http://localhost:8090/post"
});

var mainWindow;

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("ready", function() {
    mainWindow = new BrowserWindow({
        width:  800,
        height: 600
    });

    mainWindow.loadUrl("file://" + __dirname + "/index.html");

    mainWindow.on("closed", function() {
        mainWindow = null;
    });
});
