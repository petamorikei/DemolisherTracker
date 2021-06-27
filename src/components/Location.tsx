import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";

import database from "../database.json";

function MissionLocation(props: {
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

export default MissionLocation;
