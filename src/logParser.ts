import { Conduit, ConduitColor, ConduitIndex, ConduitState } from "./Conduit";
import { DemolisherName } from "./DemolisherName";
import { MissionName } from "./MissionName";
import { demolisherInfoRecord } from "./database/demolisherInfoRecord";
import { missionInfoRecord } from "./database/missionInfoRecord";
import { MissionModeName } from "./missionModeName";
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

enum ModeState {
  MISSION_SETUP = 1,
  UNLOCK_DOOR = 2,
  ARTIFACT_ROUND = 3,
  ARTIFACT_ROUND_DONE = 4,
  REWARDS_HOST = 5,
  INTERVAL = 6,
}

export type ParseResult =
  | {
      isDisruption: true;
      missionName: MissionName;
      missionMode: MissionModeName;
      round: number;
      totalConduitsComplete: number;
      conduits: Map<DemolisherName, Conduit>;
    }
  | {
      isDisruption: false;
    };

const isConduit = function (identifier: string) {
  return identifier.startsWith("SentientAmalgamArtifactAgent");
};

const isDemolisher = function (identifier: string) {
  if (identifier.startsWith("Lua")) {
    identifier = identifier.substring(3);
  } else if (identifier.endsWith("Fortress")) {
    identifier = identifier.slice(0, -8);
    if (identifier === "DisruptionNox") {
      identifier += "Agent";
    }
  }

  return Object.values(demolisherInfoRecord).some(
    (demolisherInfo) => demolisherInfo.identifier === identifier
  );
};

// const resolveEffect = function (effectId: number) {
//   return effectId.toString();
// };

const resolveIdentifierToDisplayName = function (identifier: string) {
  if (identifier.startsWith("Lua")) {
    identifier = identifier.substring(3);
  } else if (identifier.endsWith("Fortress")) {
    identifier = identifier.slice(0, -8);
    if (identifier === "DisruptionNox") {
      identifier += "Agent";
    }
  }

  // TODO: Avoid using MOA
  return (
    Object.values(demolisherInfoRecord).find(
      (demolisherInfo) => demolisherInfo.identifier === identifier
    )?.displayName || DemolisherName.DEMOLISHER_ANTI_MOA
  );
};

export const parseLog = function (data: string) {
  let parseConduitInfo = true;
  let parseTotalConduitsComplete = true;
  let round = 0;
  let modeState: ModeState | null = null;
  let totalConduitsComplete = 0;
  let latestConduitColor: ConduitColor | null = null;
  let latestDemolisherName: DemolisherName | null = null;
  let latestMissionType = "";
  let parseResult: ParseResult = { isDisruption: false };
  const conduitMap = new Map<DemolisherName, Conduit>();
  const stateMap = new Map<ConduitIndex, ConduitState>();
  const reversedLines = data.split("\r\n").reverse();

  console.group("Parse detail");
  for (const line of reversedLines) {
    if (line.startsWith("    missionType=")) {
      latestMissionType = line.split("=").at(-1) || "N/A";
    } else if (regex.missionName.test(line)) {
      // If the line matches to missionName, don't need to parse log anymore.
      const missionNameLog = line.split(": ")[3];
      if (latestMissionType === "MT_ARTIFACT") {
        for (const missionInfo of Object.values(missionInfoRecord)) {
          if (missionNameLog.startsWith(missionInfo.name)) {
            const [missionName, missionMode] = missionNameLog.split(" - ");
            parseResult = {
              isDisruption: true,
              missionName: missionName as MissionName,
              missionMode:
                missionMode === "Arbitration"
                  ? MissionModeName.ARBIRATION
                  : missionMode === "THE STEEL PATH"
                  ? MissionModeName.THE_STEEL_PATH
                  : MissionModeName.NORMAL,
              round: round,
              totalConduitsComplete: totalConduitsComplete,
              conduits: conduitMap,
            };
            break;
          }
        }
      } else {
        break;
      }
    } else if (regex.modeState.test(line)) {
      modeState = parseInt(line[line.length - 1]) as ModeState;
      if (modeState === ModeState.ARTIFACT_ROUND) {
        // If the line matches to ModeState.ARTIFACT_ROUND, don't need to get conduit info of previous rounds anymore.
        parseConduitInfo = false;
        round++;
      } else if (modeState === ModeState.ARTIFACT_ROUND_DONE) {
        parseTotalConduitsComplete = false;
      }
    } else if (parseConduitInfo) {
      if (regex.startingDefence.test(line)) {
        // If the line matches to startingDefence, add demolisherName and conduit info to map.
        const index = parseInt(line[line.length - 1]) as ConduitIndex;
        const conduit = new Conduit();
        conduit.color = latestConduitColor || undefined;
        conduit.index = index;
        const state = stateMap.get(index);
        conduit.state =
          typeof state !== "undefined" ? state : ConduitState.ACTIVE;
        // TODO: Avoid using MOA
        conduitMap.set(
          latestDemolisherName || DemolisherName.DEMOLISHER_ANTI_MOA,
          conduit
        );
      } else if (regex.completedDefence.test(line)) {
        // If the line matches to completeDefence, add conduite state and its index to temporal map.
        const index = parseInt(line[line.length - 1]) as ConduitIndex;
        stateMap.set(index, ConduitState.COMPLETED);
      } else if (regex.debuff.test(line)) {
        // let found = line.match(/[0-9]+/g);
        // let index = parseInt(found![2]);
        // let effectId = parseInt(found![3]);
        // let effect = resolveEffect(effectId);
      } else if (regex.buff.test(line)) {
        // let found = line.match(/[0-9]+/g);
        // let index = parseInt(found![2]);
        // let effectId = parseInt(found![3]);
        // let effect = resolveEffect(effectId);
      } else if (regex.failedDefence.test(line)) {
        // If the line matches to failedDefence, add conduite state and its index to temporal map.
        const index = parseInt(line[line.length - 1]) as ConduitIndex;
        stateMap.set(index, ConduitState.FAILED);
      } else if (regex.enemySpawn.test(line)) {
        const identifier = line
          .match(/\/Npc\/[a-zA-Z]+/)
          ?.at(0)
          ?.substring(5)
          .replace(/[0-9]+/, "");
        if (identifier) {
          if (isDemolisher(identifier)) {
            latestDemolisherName = resolveIdentifierToDisplayName(identifier);
          } else if (isConduit(identifier)) {
            latestConduitColor = identifier.slice(-1) as ConduitColor;
          }
        }
      }
    } else if (parseTotalConduitsComplete) {
      if (regex.totalConduitsComplete.test(line)) {
        const found = line.match(/([0-9]+)$/);
        if (found) {
          totalConduitsComplete = parseInt(found[0]);
        }
      }
    }
  }
  console.groupEnd();

  return parseResult;
};
