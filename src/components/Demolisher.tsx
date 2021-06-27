import { Box } from "@material-ui/core";
import Stat from "./Stat";

import database from "../database.json";

function Demolisher(props: {
  name: string;
  currentLevel: number;
  missionMode: string;
}) {
  const demolisher = database.demolisher.find(
    (demolisher) => demolisher.name === props.name
  );
  return (
    <Box width={1} display="flex">
      <img src={demolisher!.image} alt="" height={150}/>
      <Stat
        demolisher={demolisher!}
        currentLevel={props.currentLevel}
        missionMode={props.missionMode}
      />
    </Box>
  );
}

export default Demolisher;
