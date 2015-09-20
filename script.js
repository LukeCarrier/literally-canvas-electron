var remote        = require("remote"),
    Menu          = remote.require("menu"),
    MenuItem      = remote.require("menu-item");

var Application = function(rootNode) {
    this.literally = null;
    this.rootNode = rootNode;
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
                        click: this.openFile
                    },
                    {
                        label: "Save",
                        accelerator: "CmdOrCtrl+S",
                        click: this.saveFile
                    },
                    {
                        label: "Save As",
                        accelerator: "CmdOrCtrl+Shift+S",
                        click: this.saveFileAs
                    }
                ]
            }
        ];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

Application.prototype.openFile = function() {
    console.log("Application.openFile() unimplemented");
};

Application.prototype.saveFile = function() {
    console.log("Application.saveFile() unimplemented");
};

Application.prototype.saveFileAs = function() {
    console.log("Application.saveFileAs() unimplemented");
};
