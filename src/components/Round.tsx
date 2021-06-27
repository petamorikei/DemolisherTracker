import { TextField } from "@material-ui/core";

import useStyles from "../Styles";

function Round(props: {
  round: number;
  autoMode: boolean;
  ocrResult: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
      error={props.round < 1 || !props.ocrResult ? true : false}
      disabled={props.autoMode}
      label="Round"
      value={props.round}
      onChange={props.handleChange}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default Round;
