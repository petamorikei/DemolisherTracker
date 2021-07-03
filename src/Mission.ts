import { missionInfoMap } from "./database/missionInfoMap";
import { Demolisher } from "./Demolisher";
import { MissionMode } from "./missionModeMode";
import { MissionName } from "./MissionName";

export class Mission {
  static missionMode = MissionMode.NORMAL;
  private _missionMode: MissionMode;
  private _displayName: MissionName;
  private _startLevel: number;
  private _demolishers: Demolisher[];

  constructor(missionName: MissionName) {
    let missionInfo = missionInfoMap.get(missionName);
    if (typeof missionInfo === "undefined") {
      throw new Error(`${missionName} does NOT exist.`);
    } else {
      this._missionMode = Mission.missionMode;
      this._displayName = missionInfo.displayName;
      this._startLevel = missionInfo.startLevel;
      this._demolishers = missionInfo.demolishers.map(
        (demolisherName) => new Demolisher(demolisherName, this._displayName)
      );
      for (const demolisher of this._demolishers) {
        demolisher.startLevel = this._startLevel;
        demolisher.currentLevel = this._startLevel;
      }
    }
  }

  /**
   * Set current mode of mission.
   * This also updates its start level and demolisher's status multiplier.
   *
   * @memberof Mission
   */
  set missionMode(missionMode: MissionMode) {
    if (missionMode === MissionMode.NORMAL) {
      this._startLevel = missionInfoMap.get(this._displayName)!.startLevel;
      Demolisher.statusMultiplier = 1;
    } else if (missionMode === MissionMode.ARBIRATION) {
      this._startLevel = 60;
      Demolisher.statusMultiplier = 1;
    } else if (missionMode === MissionMode.STEEL_PATH) {
      this._startLevel =
        missionInfoMap.get(this._displayName)!.startLevel + 100;
      Demolisher.statusMultiplier = 2.5;
    }
    for (const demolisher of this._demolishers) {
      demolisher.startLevel = this._startLevel;
    }
  }

  get demolishers() {
    return this._demolishers;
  }

  get startLevel() {
    return this._startLevel;
  }
}
