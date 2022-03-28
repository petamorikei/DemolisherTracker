import "@fontsource/roboto";
import { Box } from "@material-ui/core";
import _ from "lodash";
import React from "react";

import { Conduit, ConduitState } from "./Conduit";
import { Mission } from "./Mission";
import { MissionName } from "./MissionName";
import { calcCurrentLevel } from "./calculator";
import { ConfigBox } from "./components/ConfigBox";
import { DemolisherTable } from "./components/DemolisherTable";
import { parseLog, ParseResult } from "./logParser";
import { MissionModeName } from "./missionModeName";
import { missionRecord, MissionRecord } from "./missionRecord";

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
    React.useState<MissionRecord>(missionRecord);

  const handleMissionNameChange = function (
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    const missionName = event.target.value as MissionName;
    setMissionName(missionName);
  };

  /**
   * Update state of mission mode.
   * This also updates demolisher's parameter.
   */
  const handleMissionModeChange = function (
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    const missionMode = event.target.value as MissionModeName;
    Mission.missionMode = missionMode;
    const newMissionState = _.cloneDeep(missionStates);
    for (const mission of Object.values(newMissionState)) {
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
   */
  const handleAutoModeChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const autoMode = event.target.checked;
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
      const newMissionState = _.cloneDeep(missionStates);
      for (const demolisher of newMissionState[missionName].demolishers) {
        if (typeof demolisher.conduit !== "undefined") {
          demolisher.conduit = new Conduit();
        }
      }
      setMissionStates(newMissionState);
    }
    setAutoMode(autoMode);
  };

  const applyLog = function (parseResult: ParseResult) {
    if (parseResult.isDisruption) {
      setMissionName(parseResult.missionName);
      setMissionMode(parseResult.missionMode);
      const newMissionState = _.cloneDeep(missionStates);
      // Set conduit info and calculate demolisher's level at their conduit index.
      for (const [index, conduit] of Array.from(parseResult.conduits.entries())
        .reverse()
        .entries()) {
        const currentConduitIndex = (parseResult.round - 1) * 4 + index;
        const currentLevel = calcCurrentLevel(
          missionStates[parseResult.missionName].startLevel,
          currentConduitIndex
        );
        const demolisher = newMissionState[
          parseResult.missionName
        ].demolishers.find(
          (demolisher) => demolisher.displayName === conduit[0]
        );
        if (demolisher) {
          demolisher.currentLevel = currentLevel;
          demolisher.conduit = conduit[1];
        }
      }

      // Update inactive demolisher's level.
      const conduitDoneCountInRound = parseResult.conduits.size;
      const currentConduitIndex =
        (parseResult.round - 1) * 4 + conduitDoneCountInRound;
      for (const demolisher of newMissionState[
        parseResult.missionName
      ].demolishers.filter(
        (demolisher) => demolisher.conduit.state === ConduitState.INACTIVE
      )) {
        demolisher.currentLevel = calcCurrentLevel(
          missionStates[parseResult.missionName].startLevel,
          currentConduitIndex
        );
      }

      setConduitIndex(currentConduitIndex);
      setMissionStates(newMissionState);
    }
    // TODO: Set something if current mission is not disruption.
  };

  const autoUpdateMissionStates = function (log: string) {
    console.log("Detect log.EE changes");
    const result = parseLog(log);
    console.log(result);
    applyLog(result);
  };

  const handleRoundChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let round = parseInt(event.target.value);
    round = round >= 1 ? round : 1;
    const currentConduitIndex = (round - 1) * 4;
    setConduitIndex(currentConduitIndex);
    const newMissionState = _.cloneDeep(missionStates);
    for (const mission of Object.values(newMissionState)) {
      const currentLevel = calcCurrentLevel(
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
        demolishers={missionStates[missionName].demolishers}
        autoMode={autoMode}
      />
    </Box>
  );
}
