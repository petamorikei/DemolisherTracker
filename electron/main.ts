import { app, BrowserWindow, ipcMain, desktopCapturer } from "electron";
import * as path from "path";
import isDev from "electron-is-dev";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import Jimp from "jimp";
import { Buffer } from "buffer";

import testImage from "./testImage";

const USE_TEST_IMAGE = false;

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 781,
    webPreferences: {
      // contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
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

  ipcMain.handle("request-screenshot", async (event) => {
    let dataURL: string;
    let pngBuffer: Buffer;
    if (USE_TEST_IMAGE) {
      pngBuffer = Buffer.from(testImage, "base64");
    } else {
      let sources = await desktopCapturer.getSources({
        types: ["window"],
        thumbnailSize: {
          width: 3840,
          height: 2160,
        },
      });
      let source = sources.find((source) => source.name === "Warframe");
      if (typeof source !== "undefined") {
        pngBuffer = USE_TEST_IMAGE
          ? Buffer.from(testImage, "base64")
          : source.thumbnail.toPNG();
      } else {
        return Promise.resolve({ imgData: null });
      }
    }
    let image = await Jimp.read(pngBuffer);
    // TODO: Optimize crop area
    dataURL = await image
      .crop(0, 0, 480, 640)
      .grayscale()
      .contrast(1)
      .invert()
      .getBase64Async(Jimp.MIME_PNG);
    return Promise.resolve({ imgData: dataURL });
  });
});
