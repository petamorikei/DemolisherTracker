import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import isDev from "electron-is-dev";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import fs from "fs";

const defaultLogPath = path.join(
  `${process.env.localappdata}`,
  "Warframe",
  "EE.log"
);

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 726,
    webPreferences: {
      // contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
    // frame: false,
  });

  if (isDev) {
    win.loadURL("http://localhost:3000/index.html");
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron" + (process.platform === "win32" ? ".cmd" : "")
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  }

  if (isDev) {
    // win.webContents.openDevTools();
    win.webContents.openDevTools({ mode: "detach" });
  }

  ipcMain.on("watch-eelog", (event, arg) => {
    // TODO: Use chokider instead of fs.watchFile()
    fs.watchFile(
      defaultLogPath,
      { interval: 1000 },
      (curr: fs.Stats, prev: fs.Stats) => {
        let log = fs.readFileSync(defaultLogPath, "utf8");
        win.webContents.send("update", log);
      }
    );
  });

  ipcMain.on("unwatch-eelog", (event, arg) => {
    fs.unwatchFile(defaultLogPath);
  });
}

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
