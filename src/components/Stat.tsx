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
    <Box width={1}>
      <Box display="flex" alignItems="center" height={1 / 4}>
        <Box flexGrow={1}>
          <Typography variant="h4" align="left">
            {props.demolisher.name}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" height={1 / 4}>
        <Box flexGrow={1}>
          <Typography variant="h5" align="left">
            Health
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="right">
            {health}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" height={1 / 4}>
        <Box flexGrow={1}>
          <Typography variant="h5" align="left">
            Armor (Reduction)
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="right">
            {armor} ({reduction} %)
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" height={1 / 4}>
        <Box flexGrow={1}>
          <Typography variant="h5" align="left">
            Shield
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="right">
            {shield}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Stat;
