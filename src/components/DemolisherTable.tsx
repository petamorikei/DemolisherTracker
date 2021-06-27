import { Box, Divider } from "@material-ui/core";
import Demolisher from "./Demolisher";

import database from "../database.json";

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

export default DemolisherTable;
