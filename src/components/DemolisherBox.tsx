import { Box } from "@material-ui/core";
import { ConduitState } from "../ConduitState";
import { Demolisher } from "../Demolisher";
import { Stat } from "./Stat";

export function DemolisherBox(props: {
  demolisher: Demolisher;
  autoMode: boolean;
}) {
  let conduitState = props.demolisher.conduit?.state;
  let bgColor = props.autoMode
    ? conduitState === ConduitState.INACTIVE
      ? "#929292"
      : conduitState === ConduitState.COMPLETED
      ? "#96E78E"
      : conduitState === ConduitState.FAILED
      ? "#fabfab"
      : "#ffffff"
    : "#ffffff";
  return (
    <Box width={1} display="flex" bgcolor={bgColor}>
      <img src={props.demolisher.imageData} alt="" height={150} />
      <Stat demolisher={props.demolisher!} />
    </Box>
  );
}
