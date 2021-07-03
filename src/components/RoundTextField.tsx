import { TextField } from "@material-ui/core";

import { useStyles } from "./Styles";

export function RoundTextField(props: {
  conduitDone: number;
  autoMode: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
      error={props.conduitDone < 0 ? true : false}
      disabled={props.autoMode}
      label="Round"
      value={Math.floor(props.conduitDone / 4) + 1}
      onChange={props.handleChange}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
