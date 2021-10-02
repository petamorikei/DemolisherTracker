import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
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
          key={MissionModeName.STEEL_PATH}
          value={MissionModeName.STEEL_PATH}
        >
          {MissionModeName.STEEL_PATH}
        </MenuItem>
      </Select>
    </FormControl>
  );
}
