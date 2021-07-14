import { Box, Typography } from "@material-ui/core";
import { ConduitState } from "../ConduitState";
import { Demolisher } from "../Demolisher";

export function Stat(props: { demolisher: Demolisher; autoMode: boolean }) {
  let color = "initial";
  if (
    props.autoMode &&
    props.demolisher.conduit.state === ConduitState.INACTIVE
  ) {
    color = "gray";
  }
  return (
    <Box width={1} marginLeft={1} marginRight={1} paddingTop={1} color={color}>
      <Box height={2 / 7}>
        <Typography component="div">
          <Box
            fontSize={24}
            fontWeight="fontWeightBold"
            alignItems="center"
            textAlign="center"
          >
            {props.demolisher.displayName} (Lv{props.demolisher.currentLevel})
          </Box>
        </Typography>
      </Box>
      <Box height={20 / 49}>
        <Typography component="div">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box fontSize={40} fontWeight="fontWeightBold" color="#03d4ff">
              {props.demolisher.currentShield}
            </Box>
            <Box fontSize={40} fontWeight="fontWeightBold" color="#b42921">
              {props.demolisher.currentHealth}
            </Box>
          </Box>
        </Typography>
      </Box>
      <Box height={15 / 49}>
        <Typography component="div">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box fontSize={30} fontWeight="fontWeightBold" color="#dea43a">
              {props.demolisher.currentArmor}
            </Box>
            <Box
              fontSize={30}
              fontWeight="fontWeightBold"
              color="#757575"
              marginLeft="0.5em"
            >
              ({props.demolisher.currentDamageReduction} %)
            </Box>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
