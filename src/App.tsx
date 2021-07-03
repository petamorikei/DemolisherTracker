import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import "@fontsource/roboto";
import _ from "lodash";

import { ConfigBox } from "./components/ConfigBox";
import { DemolisherTable } from "./components/DemolisherTable";
import { missionMap } from "./missionMap";
import { MissionMode } from "./missionModeMode";
import { MissionName } from "./MissionName";
import { Mission } from "./Mission";
import { ParsedLog, parseLog } from "./logParser";
import { calcCurrentLevel } from "./calculator";

let isListenerReady = false;

export function App() {
  const [missionName, setMissionName] = React.useState<MissionName>(
    MissionName.OLYMPUS_MARS
  );
  const [missionMode, setMissionMode] = React.useState<MissionMode>(
    MissionMode.NORMAL
  );
  const [autoMode, setAutoMode] = React.useState(false);
  const [conduitIndex, setConduitIndex] = React.useState(0);
  const [missionStates, setMissionStates] =
    React.useState<Map<MissionName, Mission>>(missionMap);

  const handleMissionNameChange = function (
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    const missionName = event.target.value as MissionName;
    setMissionName(missionName);
  };

  /**
   * Update state of mission mode.
   * This also updates demolisher's parameter.
   *
   * @param {React.ChangeEvent<{ value: unknown }>} event
   */
  const handleMissionModeChange = function (
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    let missionMode = event.target.value as MissionMode;
    Mission.missionMode = missionMode;
    let newMissionState = _.cloneDeep(missionStates);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, mission] of newMissionState) {
      mission.missionMode = Mission.missionMode;
      for (const demolisher of mission.demolishers) {
        demolisher.currentLevel = calcCurrentLevel(
          mission.startLevel,
          conduitIndex
        );
      }
    }
    setMissionMode(missionMode);
    setMissionStates(newMissionState);
  };

  /**
   * Toggle auto mode.
   * When true, it starts watching log.EE and updates UI automatically.
   * When false, it stops watching log.EE and removes all conduit info from demolisher.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleAutoModeChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let autoMode = event.target.checked;
    if (autoMode) {
      if (!isListenerReady) {
        isListenerReady = true;
        window.myAPI.onUpdated(autoUpdateMissionStates);
        console.log("listener ready");
      }
      window.myAPI.watch();
    } else {
      window.myAPI.unwatch();
      let newMissionState = _.cloneDeep(missionStates);
      for (const demolisher of newMissionState.get(missionName)!.demolishers) {
        if (typeof demolisher.conduit !== "undefined") {
          // Remove conduit info
          demolisher.conduit = undefined;
        }
      }
      setMissionStates(newMissionState);
    }
    setAutoMode(autoMode);
  };

  const applyLog = function (parsedLog: ParsedLog) {
    setMissionName(parsedLog.missionName);
    let conduitDoneCountInRound = parsedLog.conduits.size;
    let currentConduitIndex =
      (parsedLog.round - 1) * 4 + conduitDoneCountInRound;
    let newMissionState = _.cloneDeep(missionStates);
    // Set conduit info to demolisher if its data in log.
    // If not, calculate their level.
    for (const demolisher of newMissionState.get(parsedLog.missionName)!
      .demolishers) {
      if (demolisher.displayName in parsedLog.conduits) {
        demolisher.conduit = parsedLog.conduits.get(demolisher.displayName);
      } else {
        let currentLevel = calcCurrentLevel(
          missionMap.get(parsedLog.missionName)!.startLevel,
          currentConduitIndex
        );
        demolisher.currentLevel = currentLevel;
      }
    }
    setConduitIndex(currentConduitIndex);
    setMissionStates(newMissionState);
  };

  const autoUpdateMissionStates = function (log: string) {
    let result = parseLog(log);
    applyLog(result);
  };

  const handleRoundChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let round = parseInt(event.target.value);
    round = round >= 1 ? round : 1;
    let currentConduitIndex = (round - 1) * 4;
    setConduitIndex(currentConduitIndex);
    let newMissionState = _.cloneDeep(missionStates);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, mission] of newMissionState) {
      let currentLevel = calcCurrentLevel(
        mission.startLevel,
        currentConduitIndex
      );
      for (const demolisher of mission.demolishers) {
        demolisher.currentLevel = currentLevel;
      }
    }
    setMissionStates(newMissionState);
  };

  useEffect(() => {
    console.log(missionStates.get(missionName)?.demolishers);
  }, [missionStates, missionName]);

  return (
    <Box>
      <ConfigBox
        missionName={missionName}
        missionMode={missionMode}
        autoMode={autoMode}
        conduitDone={conduitIndex}
        handleLocationChange={handleMissionNameChange}
        handleModeChange={handleMissionModeChange}
        handleAutoModeChange={handleAutoModeChange}
        handleRoundChange={handleRoundChange}
      />
      <DemolisherTable
        demolishers={missionStates.get(missionName)!.demolishers}
        autoMode={autoMode}
      />
    </Box>
  );
}
