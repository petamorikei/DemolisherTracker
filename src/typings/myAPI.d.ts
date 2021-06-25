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
  requestScreenshot: () => Promise<string>;
};
