import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  requestScreenshot: () => ipcRenderer.invoke("request-screenshot"),
  watch: () => ipcRenderer.send("watch-eelog"),
  unwatch: () => ipcRenderer.send("unwatch-eelog"),
  onUpdated: (listener: (file: string) => void) =>
    ipcRenderer.on("update", (event, file: string) => listener(file)),
});
