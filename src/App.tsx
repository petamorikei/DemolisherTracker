import { Box } from "@material-ui/core";
import React from "react";
import "@fontsource/roboto";

import database from "./database.json";
import levels from "./levels.json";
import recognize from "./readText";
import Config from "./components/Config";
import DemolisherTable from "./components/DemolisherTable";

const INTERVAL = 10;

const scanRoundText = async function (image: string) {
  let result = await recognize(image);
  let line = result.data.lines.find((line) => line.text.startsWith("ROUND"));
  let round =
    typeof line !== "undefined"
      ? parseInt(line.text.replace(/[^0-9]/g, ""))
      : null;
  return round;
};

let calcCurrentLevel = function (
  location: string,
  missionMode: string,
  round: number
) {
  let level: number;
  if (round < 46) {
    if (missionMode === "Arbitration") {
      level = 60;
    } else {
      const mission = database.missions.find(
        (mission) => mission.location === location
      );
      level = mission!.level;
      if (missionMode === "SteelPath") {
        level += 100;
      }
    }
    for (let i = 0; i < round; i++) {
      level += levels.levelIncrease[i];
    }
  } else {
    level = 9999;
  }
  return level <= 9999 ? level : 9999;
};

function App() {
  const [location, setLocation] = React.useState("Olympus (Mars)");
  const [missionMode, setMissionMode] = React.useState("Normal");
  const [autoMode, setAutoMode] = React.useState(false);
  const [level, setLevel] = React.useState(15);
  const [round, setRound] = React.useState(1);
  const [ocrResult, setOcrResult] = React.useState(true);

  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout>();

  const handleLocationChange = function (
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    setLocation(event.target.value as string);
  };

  const handleMissionModeChange = function (
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    setMissionMode(event.target.value as string);
  };

  const handleAutoModeChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let autoMode = event.target.checked;
    if (autoMode) {
      updateDemolisherStats();
      setIntervalId(
        setInterval(function () {
          updateDemolisherStats();
        }, INTERVAL * 1000)
      );
    } else {
      if (typeof intervalId !== "undefined") {
        clearInterval(intervalId);
      }
    }
    setAutoMode(autoMode);
  };

  const handleRoundChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let round = parseInt(event.target.value);
    round = round >= 1 ? round : 1;
    setOcrResult(true);
    setRound(round);
  };

  React.useEffect(() => {
    let level = calcCurrentLevel(location, missionMode, round);
    setLevel(level);
  }, [location, missionMode, round]);

  const updateDemolisherStats = async function () {
    window.myAPI.requestScreenshot().then(async (result) => {
      let round = await scanRoundText(result.imgData);
      if (round !== null) {
        setOcrResult(true);
        setRound(round);
        let level = calcCurrentLevel(location, missionMode, round);
        setLevel(level);
      } else {
        setOcrResult(false);
      }
    });
  };

  return (
    <Box>
      <Config
        location={location}
        missionMode={missionMode}
        autoMode={autoMode}
        level={level}
        round={round}
        ocrResult={ocrResult}
        handleLocationChange={handleLocationChange}
        handleModeChange={handleMissionModeChange}
        handleAutoModeChange={handleAutoModeChange}
        handleRoundChange={handleRoundChange}
      />
      <DemolisherTable
        location={location}
        currentLevel={level}
        missionMode={missionMode}
      />
    </Box>
  );
}

export default App;
