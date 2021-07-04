import { Box } from "@material-ui/core";
import { ConduitColor } from "../Conduit";
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
      ? "#dddddd"
      : conduitState === ConduitState.COMPLETED
      ? "#96E78E"
      : conduitState === ConduitState.FAILED
      ? "#fabfab"
      : "initial"
    : "initial";
  let outline =
    conduitState === ConduitState.ACTIVE ? "solid red 5px" : "initial";
  let outlineOffset = conduitState === ConduitState.ACTIVE ? "-5px" : "initial";
  let conduitColor = props.demolisher.conduit.color;
  let conduitSymbol: string;
  if (conduitColor === ConduitColor.BLUE) {
    conduitSymbol = "./img/conduit_blue.png";
  } else if (conduitColor === ConduitColor.CYAN) {
    conduitSymbol = "./img/conduit_cyan.png";
  } else if (conduitColor === ConduitColor.RED) {
    conduitSymbol = "./img/conduit_red.png";
  } else if (conduitColor === ConduitColor.WHITE) {
    conduitSymbol = "./img/conduit_white.png";
  } else {
    conduitSymbol = "";
  }
  return (
    <Box
      width={1}
      display="flex"
      bgcolor={bgColor}
      style={{
        position: "relative",
        outline: outline,
        outlineOffset: outlineOffset,
      }}
    >
      <img src={props.demolisher.imageData} alt="" height={150} />
      <img
        src={conduitSymbol}
        alt=""
        style={{ position: "absolute", top: 86, left: 86 }}
      />
      <Stat demolisher={props.demolisher!} autoMode={props.autoMode} />
    </Box>
  );
}
