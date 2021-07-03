import { Mission } from "./Mission";
import { MissionName } from "./MissionName";

export const missionMap = new Map<MissionName, Mission>([
  [MissionName.OLYMPUS_MARS, new Mission(MissionName.OLYMPUS_MARS)],
  [MissionName.LAOMEDEIA_NEPTUNE, new Mission(MissionName.LAOMEDEIA_NEPTUNE)],
  [MissionName.UR_URANUS, new Mission(MissionName.UR_URANUS)],
  [MissionName.GANYMEDE_JUPITER, new Mission(MissionName.GANYMEDE_JUPITER)],
  [MissionName.KAPPA_SEDNA, new Mission(MissionName.KAPPA_SEDNA)],
  [MissionName.TAMU_KUVA_FORTRESS, new Mission(MissionName.TAMU_KUVA_FORTRESS)],
  [MissionName.APOLLO_LUA, new Mission(MissionName.TAMU_KUVA_FORTRESS)],
]);
