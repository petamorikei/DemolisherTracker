import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import useStyles from "../Styles";

function MissionMode(props: {
  missionMode: string;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}) {
  const classes = useStyles();
  return (
    <FormControl id="mission-mode" className={classes.formControl}>
      <InputLabel>Mission Mode</InputLabel>
      <Select autoWidth value={props.missionMode} onChange={props.handleChange}>
        <MenuItem key="Normal" value="Normal">
          Normal
        </MenuItem>
        <MenuItem key="Arbitration" value="Arbitration">
          Arbitration
        </MenuItem>
        <MenuItem key="SteelPath" value="SteelPath">
          Steel Path
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default MissionMode;
