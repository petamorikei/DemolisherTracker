import { Box } from "@material-ui/core";

import { ConduitColor, ConduitState } from "../Conduit";
import { Demolisher } from "../Demolisher";
import { Stat } from "./Stat";

export function DemolisherBox(props: {
  demolisher: Demolisher;
  autoMode: boolean;
}) {
  const conduitState = props.demolisher.conduit?.state;
  const bgColor = props.autoMode
    ? conduitState === ConduitState.INACTIVE
      ? "#dddddd"
      : conduitState === ConduitState.COMPLETED
      ? "#96E78E"
      : conduitState === ConduitState.FAILED
      ? "#fabfab"
      : "initial"
    : "initial";
  const outline =
    conduitState === ConduitState.ACTIVE ? "solid red 5px" : "initial";
  const outlineOffset =
    conduitState === ConduitState.ACTIVE ? "-5px" : "initial";
  const conduitColor = props.demolisher.conduit.color;
  let conduitSymbol: string;
  if (conduitColor === ConduitColor.BLUE) {
    conduitSymbol = "./img/conduit/blue.png";
  } else if (conduitColor === ConduitColor.CYAN) {
    conduitSymbol = "./img/conduit/cyan.png";
  } else if (conduitColor === ConduitColor.RED) {
    conduitSymbol = "./img/conduit/red.png";
  } else if (conduitColor === ConduitColor.WHITE) {
    conduitSymbol = "./img/conduit/white.png";
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
      <Stat demolisher={props.demolisher} autoMode={props.autoMode} />
    </Box>
  );
}
