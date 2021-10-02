import { Box } from "@material-ui/core";
import React from "react";
import "@fontsource/roboto";
import _ from "lodash";

import { ConfigBox } from "./components/ConfigBox";
import { DemolisherTable } from "./components/DemolisherTable";
import { missionMap } from "./missionMap";
import { MissionModeName } from "./missionModeName";
import { MissionName } from "./MissionName";
import { Mission } from "./Mission";
import { ParsedLog, parseLog } from "./logParser";
import { calcCurrentLevel } from "./calculator";
import { ConduitState } from "./ConduitState";
import { Conduit } from "./Conduit";

let isListenerReady = false;

export function App() {
  const [missionName, setMissionName] = React.useState<MissionName>(
    MissionName.OLYMPUS_MARS
  );
  const [missionMode, setMissionMode] = React.useState<MissionModeName>(
    MissionModeName.NORMAL
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
    let missionMode = event.target.value as MissionModeName;
    Mission.missionMode = missionMode;
    let newMissionState = _.cloneDeep(missionStates);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, mission] of newMissionState) {
      mission.updateDemolisherStats();
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
   * When false, it stops watching log.EE and re-initialize conduit.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleAutoModeChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let autoMode = event.target.checked;
    if (autoMode) {
      if (!isListenerReady) {
        window.myAPI.onUpdated(autoUpdateMissionStates);
        isListenerReady = true;
      }
      window.myAPI.watch();
      console.log("Start watching log.EE");
    } else {
      window.myAPI.unwatch();
      console.log("Stop watching log.EE");
      let newMissionState = _.cloneDeep(missionStates);
      for (const demolisher of newMissionState.get(missionName)!.demolishers) {
        if (typeof demolisher.conduit !== "undefined") {
          demolisher.conduit = new Conduit();
        }
      }
      setMissionStates(newMissionState);
    }
    setAutoMode(autoMode);
  };

  const applyLog = function (parsedLog: ParsedLog) {
    setMissionName(parsedLog.missionName);
    let newMissionState = _.cloneDeep(missionStates);
    // Set conduit info and calculate demolisher's level at their conduit index.
    for (const [index, conduit] of Array.from(parsedLog.conduits.entries())
      .reverse()
      .entries()) {
      let currentConduitIndex = (parsedLog.round - 1) * 4 + index;
      let currentLevel = calcCurrentLevel(
        missionStates.get(parsedLog.missionName)!.startLevel,
        currentConduitIndex
      );
      let demolisher = newMissionState
        .get(parsedLog.missionName)!
        .demolishers.find(
          (demolisher) => demolisher.displayName === conduit[0]
        )!;
      demolisher.currentLevel = currentLevel;
      demolisher.conduit = conduit[1];
    }

    // Update inactive demolisher's level.
    let conduitDoneCountInRound = parsedLog.conduits.size;
    let currentConduitIndex =
      (parsedLog.round - 1) * 4 + conduitDoneCountInRound;
    for (const demolisher of newMissionState
      .get(parsedLog.missionName)!
      .demolishers.filter(
        (demolisher) => demolisher.conduit.state === ConduitState.INACTIVE
      )) {
      demolisher.currentLevel = calcCurrentLevel(
        missionStates.get(parsedLog.missionName)!.startLevel,
        currentConduitIndex
      );
    }

    setConduitIndex(currentConduitIndex);
    setMissionStates(newMissionState);
  };

  const autoUpdateMissionStates = function (log: string) {
    console.log("Detect log.EE changes");
    let result = parseLog(log);
    console.log(result);
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
