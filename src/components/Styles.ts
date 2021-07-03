import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: theme.spacing(1),
      width: 100,
    },
    formControl: {
      margin: theme.spacing(1),
    },
    configRoot: {
      "& #mission-location": {
        width: 200,
      },
      "& #mission-mode": {
        width: 120,
      },
    },
  })
);
