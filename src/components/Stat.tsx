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
    <Box width={1} marginLeft={1} marginRight={1} color={color}>
      <Box height={2 / 7}>
        <Typography component="div">
          <Box fontSize={24} fontWeight="fontWeightBold" alignItems="center">
            {props.demolisher.displayName} (Lv{props.demolisher.currentLevel})
          </Box>
        </Typography>
      </Box>
      <Box height={5 / 21}>
        <Typography component="div">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} fontSize={20} fontWeight="fontWeightBold">
              Health
            </Box>
            <Box fontSize={20} fontWeight="fontWeightBold">
              {props.demolisher.currentHealth}
            </Box>
          </Box>
        </Typography>
      </Box>
      <Box height={5 / 21}>
        <Typography component="div">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} fontSize={20} fontWeight="fontWeightBold">
              Armor (Reduction)
            </Box>
            <Box fontSize={20} fontWeight="fontWeightBold">
              {props.demolisher.currentArmor} (
              {props.demolisher.currentDamageReduction} %)
            </Box>
          </Box>
        </Typography>
      </Box>
      <Box height={5 / 21}>
        <Typography component="div">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} fontSize={20} fontWeight="fontWeightBold">
              Shield
            </Box>
            <Box fontSize={20} fontWeight="fontWeightBold">
              {props.demolisher.currentShield}
            </Box>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
