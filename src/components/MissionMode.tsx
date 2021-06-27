import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

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
