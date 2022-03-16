import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import { MissionModeName } from "../missionModeName";
import { useStyles } from "./Styles";

export function MissionModeSelect(props: {
  missionMode: MissionModeName;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}) {
  const classes = useStyles();
  return (
    <FormControl id="mission-mode" className={classes.formControl}>
      <InputLabel>Mission Mode</InputLabel>
      <Select autoWidth value={props.missionMode} onChange={props.handleChange}>
        <MenuItem key={MissionModeName.NORMAL} value={MissionModeName.NORMAL}>
          {MissionModeName.NORMAL}
        </MenuItem>
        <MenuItem
          key={MissionModeName.ARBIRATION}
          value={MissionModeName.ARBIRATION}
        >
          {MissionModeName.ARBIRATION}
        </MenuItem>
        <MenuItem
          key={MissionModeName.THE_STEEL_PATH}
          value={MissionModeName.THE_STEEL_PATH}
        >
          {MissionModeName.THE_STEEL_PATH}
        </MenuItem>
      </Select>
    </FormControl>
  );
}
