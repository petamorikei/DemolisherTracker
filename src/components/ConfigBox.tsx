import { Box } from "@material-ui/core";
import { MissionMode } from "../missionModeMap";
import { MissionName } from "../MissionName";

import { useStyles } from "./Styles";
import { AutoModeSwitch } from "./AutoModeSwitch";
import { MissionNameSelect } from "./MissionNameSelect";
import { MissionModeSelect } from "./MissionModeSelect";
import { RoundTextField } from "./RoundTextField";

export function ConfigBox(props: {
  missionName: MissionName;
  missionMode: MissionMode;
  autoMode: boolean;
  conduitDone: number;
  handleLocationChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleModeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoundChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const classes = useStyles();
  return (
    <Box className={classes.configRoot}>
      <MissionNameSelect
        missionName={props.missionName}
        autoMode={props.autoMode}
        handleChange={props.handleLocationChange}
      />
      <MissionModeSelect
        missionMode={props.missionMode}
        handleChange={props.handleModeChange}
      />
      <AutoModeSwitch
        autoMode={props.autoMode}
        handleChange={props.handleAutoModeChange}
      />
      <RoundTextField
        conduitDone={props.conduitDone}
        autoMode={props.autoMode}
        handleChange={props.handleRoundChange}
      />
    </Box>
  );
}
