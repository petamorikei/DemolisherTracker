import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  requestScreenshot: () => ipcRenderer.invoke("request-screenshot"),
});
