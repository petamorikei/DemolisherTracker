import { Box } from "@material-ui/core";
import AutoMode from "./AutoMode";
import Level from "./Level";
import MissionLocation from "./Location";
import MissionMode from "./MissionMode";
import Round from "./Round";

function Config(props: {
  location: string;
  missionMode: string;
  autoMode: boolean;
  level: number;
  round: number;
  ocrResult: boolean;
  handleLocationChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleModeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleAutoModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoundChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Box>
      <MissionLocation
        location={props.location}
        handleChange={props.handleLocationChange}
      />
      <MissionMode
        missionMode={props.missionMode}
        handleChange={props.handleModeChange}
      />
      <AutoMode
        autoMode={props.autoMode}
        handleChange={props.handleAutoModeChange}
      />
      <Round
        round={props.round}
        autoMode={props.autoMode}
        ocrResult={props.ocrResult}
        handleChange={props.handleRoundChange}
      />
      <Level level={props.level} />
    </Box>
  );
}

export default Config;
