import { Typography } from "@material-ui/core";

function Level(props: { level: number }) {
  return (
    <Typography variant="h3" align="center">
      Lv{props.level}
    </Typography>
  );
}

export default Level;
