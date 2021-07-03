import { Box, Divider } from "@material-ui/core";
import { Demolisher } from "../Demolisher";
import { DemolisherBox } from "./DemolisherBox";

export function DemolisherTable(props: { demolishers: Demolisher[], autoMode: boolean }) {
  return (
    <Box id="stats">
      {props.demolishers.map((demolisher) => {
        return (
          <Box key={demolisher.displayName}>
            <Divider />
            <DemolisherBox demolisher={demolisher} autoMode={props.autoMode}/>
          </Box>
        );
      })}
    </Box>
  );
}
