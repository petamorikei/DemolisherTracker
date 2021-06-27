import { Box, Typography } from "@material-ui/core";

import calculator from "../calculator";

function Stat(props: {
  demolisher: {
    name: string;
    faction: string;
    baseHealth: number;
    baseArmor: number;
    baseShield: number;
    image: string;
  };
  currentLevel: number;
  missionMode: string;
}) {
  const missionModeMultiplier = props.missionMode === "SteelPath" ? 2.5 : 1;
  const health = calculator.calcHealth(
    props.demolisher.baseHealth,
    props.currentLevel,
    1,
    missionModeMultiplier
  );
  const armor = calculator.calcArmor(
    props.demolisher.baseArmor,
    props.currentLevel,
    1,
    missionModeMultiplier
  );
  const reduction = calculator.calcDamageReduction(armor);
  const shield = calculator.calcShield(
    props.demolisher.baseShield,
    props.currentLevel,
    1,
    missionModeMultiplier
  );

  return (
    <Box width={1} marginLeft={1} marginRight={1}>
      <Box height={2 / 7}>
        <Typography component="div">
          <Box fontSize={24} fontWeight="fontWeightBold" alignItems="center">
            {props.demolisher.name}
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
              {health}
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
              {armor} ({reduction} %)
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
              {shield}
            </Box>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default Stat;
