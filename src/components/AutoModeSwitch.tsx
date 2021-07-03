import { FormControlLabel, Switch } from "@material-ui/core";
import { useStyles } from "./Styles";

export function AutoModeSwitch(props: {
  autoMode: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.formControl}
      control={
        <Switch
          checked={props.autoMode}
          onChange={props.handleChange}
          color="primary"
        />
      }
      label="Auto"
    />
  );
}
