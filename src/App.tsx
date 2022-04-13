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

  /**
   * Update state of mission name.
   */
  const handleMissionNameChange = function (
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    const missionName = event.target.value as MissionName;
    console.log(`Update mission name: ${missionName}`);
    setMissionName(missionName);
  };

  /**
   * Update state of mission mode.
   * This also updates demolisher's parameters.
   */
  const handleMissionModeChange = function (
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    const missionMode = event.target.value as MissionModeName;
    console.log(`Update mission mode: ${missionMode}`);
    Mission.missionMode = missionMode;
    const newMissionStates = _.cloneDeep(missionStates);
    for (const mission of Object.values(newMissionStates)) {
      mission.updateDemolisherStats();
    }
    for (const mission of Object.values(newMissionStates)) {
      const currentLevel = calcCurrentLevel(mission.startLevel, conduitIndex);
      for (const demolisher of mission.demolishers) {
        demolisher.currentLevel = currentLevel;
      }
    }
    setMissionMode(missionMode);
    setMissionStates(newMissionStates);
  };

  /**
   * Toggle auto mode.
   * When true, it starts watching EE.log and updates UI automatically.
   * When false, it stops watching EE.log and re-initialize conduit.
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
      console.log("Start watching EE.log");
    } else {
      window.myAPI.unwatch();
      console.log("Stop watching EE.log");
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

  /**
   * Update mission states.
   */
  const autoUpdateMissionStates = function (log: string) {
    console.log("Detect EE.log changes");
    const result = parseLog(log);
    console.log(result);
    applyLog(result);
  };

  /**
   * Update state of round.
   */
  const handleRoundChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let round = parseInt(event.target.value);
    round = round >= 1 ? round : 1;
    const currentConduitIndex = (round - 1) * 4;
    console.log(`Update round: ${round}`);
    const newMissionStates = _.cloneDeep(missionStates);
    for (const mission of Object.values(newMissionStates)) {
      const currentLevel = calcCurrentLevel(
        mission.startLevel,
        currentConduitIndex
      );
      for (const demolisher of mission.demolishers) {
        demolisher.currentLevel = currentLevel;
      }
    }
    setConduitIndex(currentConduitIndex);
    setMissionStates(newMissionStates);
  };

  const applyLog = function (parseResult: ParseResult) {
    if (parseResult.isDisruption) {
      const newMissionStates = _.cloneDeep(missionStates);
      Mission.missionMode = parseResult.missionMode;
      for (const mission of Object.values(newMissionStates)) {
        mission.updateDemolisherStats();
      }

      // Set conduit info and calculate demolisher's level at their conduit index.
      for (const [index, conduit] of Array.from(parseResult.conduits.entries())
        .reverse()
        .entries()) {
        const currentConduitIndex = (parseResult.round - 1) * 4 + index;
        const currentLevel = calcCurrentLevel(
          newMissionStates[parseResult.missionName].startLevel,
          currentConduitIndex
        );
        const demolisher = newMissionStates[
          parseResult.missionName
        ].demolishers.find(
          (demolisher) => demolisher.displayName === conduit[0]
        );
        console.log(demolisher);
        if (demolisher) {
          demolisher.currentLevel = currentLevel;
          demolisher.conduit = conduit[1];
        }
      }

      // Update inactive demolisher's level.
      const conduitDoneCountInRound = parseResult.conduits.size;
      const currentConduitIndex =
        (parseResult.round - 1) * 4 + conduitDoneCountInRound;
      for (const demolisher of newMissionStates[
        parseResult.missionName
      ].demolishers.filter(
        (demolisher) => demolisher.conduit.state === ConduitState.INACTIVE
      )) {
        demolisher.currentLevel = calcCurrentLevel(
          newMissionStates[parseResult.missionName].startLevel,
          currentConduitIndex
        );
      }

      setMissionName(parseResult.missionName);
      setMissionMode(parseResult.missionMode);
      setConduitIndex(currentConduitIndex);
      setMissionStates(newMissionStates);
    } else {
      // TODO: Set something if current mission is not disruption.
    }
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
