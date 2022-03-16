import { DemolisherName } from "../DemolisherName";
import { MissionName } from "../MissionName";

interface MissionInfo {
  name: MissionName;
  startLevel: number;
  demolishers: DemolisherName[];
}

type MissionInfoRecord = Record<MissionName, MissionInfo>;

export const missionInfoRecord: MissionInfoRecord = {
  [MissionName.OLYMPUS_MARS]: {
    name: MissionName.OLYMPUS_MARS,
    startLevel: 15,
    demolishers: [
      DemolisherName.DEMOLISHER_DEVOURER,
      DemolisherName.DEMOLISHER_EXPIRED,
      DemolisherName.DEMOLISHER_BAILIFF,
      DemolisherName.DEMOLISHER_HEAVY_GUNNER,
    ],
  },
  [MissionName.LAOMEDEIA_NEPTUNE]: {
    name: MissionName.LAOMEDEIA_NEPTUNE,
    startLevel: 25,
    demolishers: [
      DemolisherName.DEMOLISHER_ANTI_MOA,
      DemolisherName.DEMOLISHER_BURSA,
      DemolisherName.DEMOLISHER_HYENA,
      DemolisherName.DEMOLISHER_MACHINIST,
    ],
  },
  [MissionName.UR_URANUS]: {
    name: MissionName.UR_URANUS,
    startLevel: 30,
    demolishers: [
      DemolisherName.DEMOLISHER_BOILER,
      DemolisherName.DEMOLISHER_CHARGER,
      DemolisherName.DEMOLISHER_JUGGERNAUT,
      DemolisherName.DEMOLISHER_THRASHER,
    ],
  },
  [MissionName.GANYMEDE_JUPITER]: {
    name: MissionName.GANYMEDE_JUPITER,
    startLevel: 30,
    demolishers: [
      DemolisherName.DEMOLYST_HEQET,
      DemolisherName.DEMOLYST_MACHINIST,
      DemolisherName.DEMOLYST_MOA,
      DemolisherName.DEMOLYST_SATYR,
    ],
  },
  [MissionName.KAPPA_SEDNA]: {
    name: MissionName.KAPPA_SEDNA,
    startLevel: 34,
    demolishers: [
      DemolisherName.DEMOLISHER_EXPIRED,
      DemolisherName.DEMOLISHER_BAILIFF,
      DemolisherName.DEMOLISHER_HEAVY_GUNNER,
      DemolisherName.DEMOLISHER_NOX,
    ],
  },
  [MissionName.TAMU_KUVA_FORTRESS]: {
    name: MissionName.TAMU_KUVA_FORTRESS,
    startLevel: 35,
    demolishers: [
      DemolisherName.DEMOLISHER_BAILIFF,
      DemolisherName.DEMOLISHER_HEAVY_GUNNER,
      DemolisherName.DEMOLISHER_NOX,
      DemolisherName.DEMOLISHER_KUVA_GUARDIAN,
    ],
  },
  [MissionName.APOLLO_LUA]: {
    name: MissionName.APOLLO_LUA,
    startLevel: 35,
    demolishers: [
      DemolisherName.DEMOLISHER_ANTI_MOA,
      DemolisherName.DEMOLISHER_BURSA,
      DemolisherName.DEMOLISHER_HYENA,
      DemolisherName.DEMOLISHER_MACHINIST,
    ],
  },
};
