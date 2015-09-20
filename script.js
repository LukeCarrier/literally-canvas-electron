var fs       = require("fs"),
    remote   = require("remote"),
    dialog   = remote.require("dialog"),
    Menu     = remote.require("menu"),
    MenuItem = remote.require("menu-item");

var Application = function(rootNode) {
    this.fileName  = null;
    this.literally = null;
    this.rootNode  = rootNode;
};

Application.prototype.run = function() {
    this.initMenu();
    this.initCanvas();
};

Application.prototype.initCanvas = function() {
    this.literally = LC.init(this.rootNode, {
        imageURLPrefix: "bower_components/literallycanvas/img"
    });
};

Application.prototype.initMenu = function() {
    var menu,
        template = [
            {
                label: "File",
                submenu: [
                    {
                        label: "Open",
                        accelerator: "CmdOrCtrl+O",
                        click: this.openFile.bind(this)
                    },
                    {
                        label: "Save",
                        accelerator: "CmdOrCtrl+S",
                        click: this.saveFile.bind(this)
                    },
                    {
                        label: "Save As",
                        accelerator: "CmdOrCtrl+Shift+S",
                        click: this.saveFileAs.bind(this)
                    }
                ]
            },
            {
                label: "Help",
                submenu: [
                    {
                        label: "Toggle Developer Tools",
                        accelerator: (process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I"),
                        click: function(item, focusedWindow) {
                            if (focusedWindow) {
                                focusedWindow.toggleDevTools();
                            }
                        }
                    }
                ]
            }
        ];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

Application.prototype.openFile = function() {
    var application = this;

    dialog.showOpenDialog(function(fileNames) {
        if (fileNames.length < 1 || fileNames[0] === undefined) {
            return;
        }
        var fileName = fileNames[0];

        fs.readFile(fileName, 'utf-8', function(err, snapshot) {
            snapshot = JSON.parse(snapshot);

            application.fileName = fileName;
            application.literally.loadSnapshot(snapshot);
        });
    });
};

Application.prototype.saveFile = function() {
    var snapshot = JSON.stringify(this.literally.getSnapshot());

    if (this.fileName) {
        fs.writeFile(this.fileName, snapshot);
    } else {
        this.saveFileAs();
    }
};

Application.prototype.saveFileAs = function() {
    var application = this,
        snapshot    = JSON.stringify(this.literally.getSnapshot());

    dialog.showSaveDialog(function(fileName) {
        if (fileName === undefined) {
            return;
        }

        application.fileName = fileName;

        fs.writeFile(fileName, snapshot);
    });
};
