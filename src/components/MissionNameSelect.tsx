import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import { MissionName } from "../MissionName";
import { useStyles } from "./Styles";

export function MissionNameSelect(props: {
  missionName: MissionName;
  autoMode: boolean;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}) {
  const classes = useStyles();
  const missionNames = Object.values(MissionName).map((missionName) => (
    <MenuItem key={missionName} value={missionName}>
      {missionName}
    </MenuItem>
  ));

  return (
    <FormControl id="mission-name" className={classes.formControl}>
      <InputLabel>Location</InputLabel>
      <Select
        autoWidth
        disabled={props.autoMode}
        value={props.missionName}
        onChange={props.handleChange}
      >
        {missionNames}
      </Select>
    </FormControl>
  );
}
