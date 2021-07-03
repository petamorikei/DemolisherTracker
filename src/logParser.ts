import { Conduit, ConduitColor, ConduitIndex } from "./Conduit";
import { ConduitState } from "./ConduitState";
import { demolisherInfoMap } from "./database/demolisherInfoMap";
import { missionInfoMap } from "./database/missionInfoMap";
import { DemolisherName } from "./DemolisherName";
import { MissionName } from "./MissionName";
import { regex } from "./regex";

// Log sample
// 197.555 Script [Info]: MissionIntro.lua: MissionName: OLYMPUS"
// 91.348 Script [Info]: SentientArtifactMission.lua: ModeState = 1
// 1877.286 Script [Info]: SentientArtifactMission.lua: Disruption: Randomized buff for area 2: 34
// 103.871 Script [Info]: SentientArtifactMission.lua: Disruption: Randomized debuff for area 1: 4
// 143.571 Script [Info]: SentientArtifactMission.lua: Disruption: Starting defense for artifact 1
// 176.516 Script [Info]: SentientArtifactMission.lua: Disruption: Completed defense for artifact 1
// 248.403 Script [Info]: SentientArtifactMission.lua: Disruption: Failed defense for artifact 4
// 281.990 Script [Info]: SentientArtifactMission.lua: Disruption: Total artifacts complete so far this mission: 3
// "1841.724 AI [Info]: OnAgentCreated /Npc/SentientAmalgamArtifactAgentC78 Live 14 Spawned 74 Ignored Ticking 11 Paused 3 IgnoredTicking 1 MonitoredTicking 10 AllyLive 1 AllyActive 1 NeutralActive 0";
// "267.879 AI [Info]: OnAgentCreated /Npc/DisruptionCharger83 Live 20 Spawned 77 Ticking 19 Paused 1 IgnoredTicking 2 MonitoredTicking 17 AllyLive 1 AllyActive 1 NeutralActive 0";

// ModeState
// 1: MISSION_SETUP
// 2: UNLOCK_DOOR
// 3: ARTIFACT_ROUND
// 4: ARTIFACT_ROUND_DONE
// 5: REWARDS (host)
// 6: INTERVAL

export interface ParsedLog {
  missionName: MissionName;
  round: number;
  totalConduitsComplete: number;
  conduits: Map<DemolisherName, Conduit>;
}

const isConduit = function (identifier: string) {
  return identifier.startsWith("SentientAmalgamArtifactAgent");
};

const isDemolisher = function (identifier: string) {
  let result = false;
  if (identifier.startsWith("Lua")) {
    identifier = identifier.substring(3);
  } else if (identifier.endsWith("Fortress")) {
    identifier = identifier.slice(0, -8);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, demolisherInfo] of demolisherInfoMap) {
    if (demolisherInfo.identifier === identifier) {
      result = true;
      break;
    }
  }
  return result;
};

// const resolveEffect = function (effectId: number) {
//   return effectId.toString();
// };

const resolveIdentifierToDisplayName = function (identifier: string) {
  // Temporal initialization
  let demolisherName = DemolisherName.DEMOLISHER_ANTI_MOA;
  if (identifier.startsWith("Lua")) {
    identifier = identifier.substring(3);
  } else if (identifier.endsWith("Fortress")) {
    identifier = identifier.slice(0, -8);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, demolisherInfo] of demolisherInfoMap) {
    if (demolisherInfo.identifier === identifier) {
      demolisherName = demolisherInfo.displayName;
      break;
    }
  }
  return demolisherName;
};

export const parseLog = function (data: string) {
  let parseConduitInfo = true;
  let parseTotalConduitsComplete = true;
  let missionName: MissionName | null = null;
  let round = 0;
  let modeState = 0;
  let totalConduitsComplete = 0;
  let latestConduitColor: ConduitColor | null = null;
  let latestDemolisherName: DemolisherName | null = null;
  let conduitMap = new Map<DemolisherName, Conduit>();
  const lines = data.split("\r\n").reverse();
  for (const line of lines) {
    if (regex.missionName.test(line)) {
      let missionNameLog = line.split(": ")[3];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_, missionInfo] of missionInfoMap) {
        if (missionInfo.logName === missionNameLog) {
          missionName = missionInfo.displayName;
        }
      }
      break;
    } else if (regex.modeState.test(line)) {
      modeState = parseInt(line[line.length - 1]);
      if (modeState === 3) {
        parseConduitInfo = false;
        round++;
      } else if (modeState === 4) {
        parseTotalConduitsComplete = false;
      }
    } else if (parseConduitInfo) {
      if (regex.startingDefence.test(line)) {
        let index = parseInt(line[line.length - 1]) as ConduitIndex;
        let conduit = new Conduit();
        conduit.color = latestConduitColor!;
        conduit.index = index;
        conduit.state = ConduitState.ACTIVE;
        conduitMap.set(latestDemolisherName!, conduit);
      } else if (regex.completedDefence.test(line)) {
        let index = parseInt(line[line.length - 1]) as ConduitIndex;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, conduit] of conduitMap) {
          if (conduit.index === index) {
            conduit.state = ConduitState.COMPLETED;
          }
        }
      } else if (regex.debuff.test(line)) {
        // let found = line.match(/[0-9]+/g);
        // let index = parseInt(found![2]);
        // let effectId = parseInt(found![3]);
        // let effect = resolveEffect(effectId);
        // console.log(line);
      } else if (regex.buff.test(line)) {
        // let found = line.match(/[0-9]+/g);
        // let index = parseInt(found![2]);
        // let effectId = parseInt(found![3]);
        // let effect = resolveEffect(effectId);
        // console.log(line);
      } else if (regex.failedDefence.test(line)) {
        let index = parseInt(line[line.length - 1]) as ConduitIndex;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, conduit] of conduitMap) {
          if (conduit.index === index) {
            conduit.state = ConduitState.FAILED;
          }
        }
      } else if (regex.enemySpawn.test(line)) {
        let identifier = line
          .match(/\/Npc\/[a-zA-Z]+/)![0]
          .substring(5)
          .replace(/[0-9]+/, "");
        if (isDemolisher(identifier)) {
          latestDemolisherName = resolveIdentifierToDisplayName(identifier);
        } else if (isConduit(identifier)) {
          latestConduitColor = identifier.slice(-1) as ConduitColor;
        }
      }
    } else if (parseTotalConduitsComplete) {
      if (regex.totalConduitsComplete.test(line)) {
        let found = line.match(/([0-9]+)$/);
        totalConduitsComplete = parseInt(found![0]);
      }
    }
  }
  return {
    missionName: missionName!,
    round: round,
    totalConduitsComplete: totalConduitsComplete,
    conduits: conduitMap,
  } as ParsedLog;
};
