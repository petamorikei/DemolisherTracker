import { missionInfoMap } from "./database/missionInfoMap";
import { Demolisher } from "./Demolisher";
import { MissionMode } from "./missionModeMode";
import { MissionName } from "./MissionName";

export class Mission {
  static missionMode = MissionMode.NORMAL;
  private _displayName: MissionName;
  private _startLevel: number;
  private _demolishers: Demolisher[];

  constructor(missionName: MissionName) {
    let missionInfo = missionInfoMap.get(missionName);
    if (typeof missionInfo === "undefined") {
      throw new Error(`${missionName} does NOT exist.`);
    } else {
      this._displayName = missionInfo.displayName;
      this._startLevel = missionInfo.startLevel;
      this._demolishers = missionInfo.demolishers.map(
        (demolisherName) => new Demolisher(demolisherName, this._displayName)
      );
      for (const demolisher of this._demolishers) {
        demolisher.currentLevel = this._startLevel;
      }
    }
  }

  /**
   * Update demolisher's start level and status multiplier.
   * This method needs to be called when missionMode is changed.
   *
   * @memberof Mission
   */
  updateDemolisherStats() {
    if (Mission.missionMode === MissionMode.NORMAL) {
      this._startLevel = missionInfoMap.get(this._displayName)!.startLevel;
      Demolisher.statusMultiplier = 1;
    } else if (Mission.missionMode === MissionMode.ARBIRATION) {
      this._startLevel = 60;
      Demolisher.statusMultiplier = 1;
    } else if (Mission.missionMode === MissionMode.STEEL_PATH) {
      this._startLevel =
        missionInfoMap.get(this._displayName)!.startLevel + 100;
      Demolisher.statusMultiplier = 2.5;
    }
  }

  get startLevel() {
    return this._startLevel;
  }

  get demolishers() {
    return this._demolishers;
  }
}
