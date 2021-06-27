import { FormControlLabel, Switch } from "@material-ui/core";

function AutoMode(props: {
  autoMode: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <FormControlLabel
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

export default AutoMode;
