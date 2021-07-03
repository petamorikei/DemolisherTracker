export const regex = {
  missionName:
    /^([0-9.]+) Script \[Info\]: MissionIntro.lua: MissionName: ([^\r\n ]+)/,
  modeState:
    /^([0-9.]+) Script \[Info\]: SentientArtifactMission.lua: ModeState = [0-9]/,
  buff: /^([0-9.]+) Script \[Info\]: SentientArtifactMission.lua: Disruption: Randomized buff for area [1234]: [0-9]+/,
  debuff:
    /^([0-9.]+) Script \[Info\]: SentientArtifactMission.lua: Disruption: Randomized debuff for area [1234]: [0-9]+/,
  startingDefence:
    /^([0-9.]+) Script \[Info\]: SentientArtifactMission.lua: Disruption: Starting defense for artifact [1234]/,
  completedDefence:
    /^([0-9.]+) Script \[Info\]: SentientArtifactMission.lua: Disruption: Completed defense for artifact [1234]/,
  failedDefence:
    /^([0-9.]+) Script \[Info\]: SentientArtifactMission.lua: Disruption: Failed defense for artifact [1234]/,
  totalConduitsComplete:
    /^([0-9.]+) Script \[Info\]: SentientArtifactMission.lua: Disruption: Total artifacts complete so far this mission: [0-9]+/,
  enemySpawn: /^([0-9.]+).*AI \[Info\]: OnAgentCreated ([^\r\n ]+)/,
};
