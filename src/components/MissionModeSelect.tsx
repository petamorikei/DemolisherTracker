import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { MissionMode } from "../missionModeMode";
import { useStyles } from "./Styles";

export function MissionModeSelect(props: {
  missionMode: MissionMode;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}) {
  const classes = useStyles();
  return (
    <FormControl id="mission-mode" className={classes.formControl}>
      <InputLabel>Mission Mode</InputLabel>
      <Select autoWidth value={props.missionMode} onChange={props.handleChange}>
        <MenuItem key={MissionMode.NORMAL} value={MissionMode.NORMAL}>
          {MissionMode.NORMAL}
        </MenuItem>
        <MenuItem
          key={MissionMode.ARBIRATION}
          value={MissionMode.ARBIRATION}
        >
          {MissionMode.ARBIRATION}
        </MenuItem>
        <MenuItem
          key={MissionMode.STEEL_PATH}
          value={MissionMode.STEEL_PATH}
        >
          {MissionMode.STEEL_PATH}
        </MenuItem>
      </Select>
    </FormControl>
  );
}
