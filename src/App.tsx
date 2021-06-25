import * as React from "react";
import "@fontsource/roboto";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import database from "./database.json";
import levels from "./levels.json";
import calculator from "./calculator";
import recognize from "./readText";

const INTERVAL = 10;

function Location(props: {
  location: string;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}) {
  const locations = database.missions.map((mission) => (
    <MenuItem key={mission.location} value={mission.location}>
      {mission.location}
    </MenuItem>
  ));

  return (
    <FormControl>
      <InputLabel>Location</InputLabel>
      <Select autoWidth value={props.location} onChange={props.handleChange}>
        {locations}
      </Select>
    </FormControl>
  );
}

function MissionMode(props: {
  missionMode: string;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}) {
  return (
    <FormControl>
      <InputLabel>Mission Mode</InputLabel>
      <Select autoWidth value={props.missionMode} onChange={props.handleChange}>
        <MenuItem key="Normal" value="Normal">
          Normal
        </MenuItem>
        <MenuItem key="Arbitrarion" value="Arbitrarion">
          Arbitrarion
        </MenuItem>
        <MenuItem key="SteelPath" value="SteelPath">
          Steel Path
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function AutoMode(props: {
  autoMode: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={props.autoMode}
          onChange={props.handleChange}
          name="checkedB"
          color="primary"
        />
      }
      label="Auto"
    />
  );
}

function Level(props: { level: number }) {
  return (
    <Typography variant="h3" align="center">
      Lv{props.level}
    </Typography>
  );
}

function Round(props: {
  round: number;
  autoMode: boolean;
  ocrResult: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <TextField
      error={props.round < 1 || !props.ocrResult ? true : false}
      disabled={props.autoMode}
      label="Round"
      value={props.round}
      onChange={props.handleChange}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

const scanRoundText = async function (image: string) {
  let result = await recognize(image);
  let line = result.data.lines.find((line) => line.text.startsWith("ROUND"));
  let round =
    typeof line !== "undefined"
      ? parseInt(line.text.replace(/[^0-9]/g, ""))
      : null;
  return round;
};

function Config(props: {
  location: string;
  missionMode: string;
  autoMode: boolean;
  level: number;
  round: number;
  ocrResult: boolean;
  handleLocationChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleModeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoundChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Box>
      <Location
        location={props.location}
        handleChange={props.handleLocationChange}
      />
      <MissionMode
        missionMode={props.missionMode}
        handleChange={props.handleModeChange}
      />
      <AutoMode
        autoMode={props.autoMode}
        handleChange={props.handleAutoModeChange}
      />
      <Round
        round={props.round}
        autoMode={props.autoMode}
        ocrResult={props.ocrResult}
        handleChange={props.handleRoundChange}
      />
      <Level level={props.level} />
    </Box>
  );
}

function Stat(props: {
  demolisher: {
    name: string;
    faction: string;
    baseHealth: number;
    baseArmor: number;
    baseShield: number;
    image: string;
  };
  currentLevel: number;
  missionMode: string;
}) {
  const missionModeMultiplier = props.missionMode === "SteelPath" ? 2.5 : 1;
  const health = calculator.calcHealth(
    props.demolisher.baseHealth,
    props.currentLevel,
    1,
    missionModeMultiplier
  );
  const armor = calculator.calcArmor(
    props.demolisher.baseArmor,
    props.currentLevel,
    1,
    missionModeMultiplier
  );
  const reduction = calculator.calcDamageReduction(armor);
  const shield = calculator.calcShield(
    props.demolisher.baseShield,
    props.currentLevel,
    1,
    missionModeMultiplier
  );

  return (
    <Box width={1}>
      <Box display="flex" alignItems="center" height={1 / 4}>
        <Box flexGrow={1}>
          <Typography variant="h4" align="left">
            {props.demolisher.name}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" height={1 / 4}>
        <Box flexGrow={1}>
          <Typography variant="h5" align="left">
            Health
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="right">
            {health}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" height={1 / 4}>
        <Box flexGrow={1}>
          <Typography variant="h5" align="left">
            Armor (Reduction)
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="right">
            {armor} ({reduction} %)
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" height={1 / 4}>
        <Box flexGrow={1}>
          <Typography variant="h5" align="left">
            Shield
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="right">
            {shield}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function Demolisher(props: {
  name: string;
  currentLevel: number;
  missionMode: string;
}) {
  const demolisher = database.demolisher.find(
    (demolisher) => demolisher.name === props.name
  );
  return (
    <Box width={1} display="flex">
      <img src={demolisher!.image} alt="" />
      <Stat
        demolisher={demolisher!}
        currentLevel={props.currentLevel}
        missionMode={props.missionMode}
      />
    </Box>
  );
}

function DemolisherTable(props: {
  location: string;
  currentLevel: number;
  missionMode: string;
}) {
  const mission = database.missions.find(
    (mission) => mission.location === props.location
  );
  const demolishers = mission?.enemies;
  return (
    <Box id="stats">
      {demolishers!.map((demolisher) => {
        return (
          <Box key={demolisher}>
            <Divider />
            <Demolisher
              name={demolisher}
              currentLevel={props.currentLevel}
              missionMode={props.missionMode}
            />
          </Box>
        );
      })}
    </Box>
  );
}

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
    setRound(round);
    let level = calcLevelByRound(location, missionMode, round);
    setLevel(level);
  };

  const updateDemolisherStats = async function () {
    window.myAPI.requestScreenshot().then(async (result) => {
      let round = await scanRoundText(result.imgData);
      // let round = await scanRoundText(testImage.mono);
      if (round !== null) {
        setOcrResult(true);
        setRound(round);
        let level = calcLevelByRound(location, missionMode, round);
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

let calcLevelByRound = function (
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
      if (missionMode === "Steel Path") {
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

export default App;
