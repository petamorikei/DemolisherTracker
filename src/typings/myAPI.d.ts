/**
 * Declare a type that depends on the renderer process of Electron.
 */
declare global {
  interface Window {
    myAPI: MyAPI;
  }
}

/**
 * Provides an application-specific API.
 */
export type MyAPI = {
  watch: () => void;
  unwatch: () => void;
  onUpdated: (listener: (file: string) => void) => Electron.IpcRenderer;
};
