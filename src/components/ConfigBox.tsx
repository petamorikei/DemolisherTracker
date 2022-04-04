import { Box } from "@material-ui/core";

import { MissionName } from "../MissionName";
import { MissionModeName } from "../missionModeName";
import { AutoModeSwitch } from "./AutoModeSwitch";
import { MissionModeSelect } from "./MissionModeSelect";
import { MissionNameSelect } from "./MissionNameSelect";
import { RoundTextField } from "./RoundTextField";
import { useStyles } from "./Styles";

export function ConfigBox(props: {
  missionName: MissionName;
  missionMode: MissionModeName;
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
        autoMode={props.autoMode}
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
