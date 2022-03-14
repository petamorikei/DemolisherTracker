import { Box, Typography } from "@material-ui/core";

import { ConduitState } from "../ConduitState";
import { Demolisher } from "../Demolisher";
import { useStyles } from "./Styles";

export function Stat(props: { demolisher: Demolisher; autoMode: boolean }) {
  let color = "initial";
  if (
    props.autoMode &&
    props.demolisher.conduit.state === ConduitState.INACTIVE
  ) {
    color = "gray";
  }
  const classes = useStyles();
  return (
    <Box width={1} marginLeft={1} marginRight={1} paddingTop={1} color={color}>
      <Box height={2 / 7}>
        <Typography component="div">
          <Box
            fontSize={24}
            fontWeight="fontWeightBold"
            alignItems="center"
            textAlign="center"
            className={classes.shadow}
          >
            {props.demolisher.displayName} (Lv{props.demolisher.currentLevel})
          </Box>
        </Typography>
      </Box>
      <Box height={20 / 49}>
        <Typography component="div">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              fontSize={40}
              fontWeight="fontWeightBold"
              color="#03d4ff"
              className={classes.shadow}
            >
              {props.demolisher.currentShield}
            </Box>
            <Box
              fontSize={40}
              fontWeight="fontWeightBold"
              color="#b42921"
              className={classes.shadow}
            >
              {props.demolisher.currentHealth}
            </Box>
          </Box>
        </Typography>
      </Box>
      <Box height={15 / 49}>
        <Typography component="div">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              fontSize={30}
              fontWeight="fontWeightBold"
              color="#dea43a"
              className={classes.shadow}
            >
              {props.demolisher.currentArmor}
            </Box>
            <Box
              fontSize={30}
              fontWeight="fontWeightBold"
              marginLeft="0.5em"
              className={classes.shadow}
            >
              ({props.demolisher.currentDamageReduction} %)
            </Box>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
