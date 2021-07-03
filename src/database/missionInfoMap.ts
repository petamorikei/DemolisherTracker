import { DemolisherName } from "../DemolisherName";
import { MissionName } from "../MissionName";

interface MissionInfo {
  displayName: MissionName;
  logName: string;
  startLevel: number;
  demolishers: DemolisherName[];
}

export const missionInfoMap = new Map<MissionName, MissionInfo>([
  [
    MissionName.OLYMPUS_MARS,
    {
      displayName: MissionName.OLYMPUS_MARS,
      logName: "OLYMPUS",
      startLevel: 15,
      demolishers: [
        DemolisherName.DEMOLISHER_DEVOURER,
        DemolisherName.DEMOLISHER_EXPIRED,
        DemolisherName.DEMOLISHER_BAILIFF,
        DemolisherName.DEMOLISHER_HEAVY_GUNNER,
      ],
    },
  ],
  [
    MissionName.LAOMEDEIA_NEPTUNE,
    {
      displayName: MissionName.LAOMEDEIA_NEPTUNE,
      logName: "LAOMEDEIA",
      startLevel: 25,
      demolishers: [
        DemolisherName.DEMOLISHER_ANTI_MOA,
        DemolisherName.DEMOLISHER_BURSA,
        DemolisherName.DEMOLISHER_HYENA,
        DemolisherName.DEMOLISHER_MACHINIST,
      ],
    },
  ],
  [
    MissionName.UR_URANUS,
    {
      displayName: MissionName.UR_URANUS,
      logName: "DARK SECTOR UR",
      startLevel: 30,
      demolishers: [
        DemolisherName.DEMOLISHER_BOILER,
        DemolisherName.DEMOLISHER_CHARGER,
        DemolisherName.DEMOLISHER_JUGGERNAUT,
        DemolisherName.DEMOLISHER_THRASHER,
      ],
    },
  ],
  [
    MissionName.GANYMEDE_JUPITER,
    {
      displayName: MissionName.GANYMEDE_JUPITER,
      logName: "GANYMEDE",
      startLevel: 30,
      demolishers: [
        DemolisherName.DEMOLYST_HEQET,
        DemolisherName.DEMOLYST_MACHINIST,
        DemolisherName.DEMOLYST_MOA,
        DemolisherName.DEMOLYST_SATYR,
      ],
    },
  ],
  [
    MissionName.KAPPA_SEDNA,
    {
      displayName: MissionName.KAPPA_SEDNA,
      logName: "KAPPA",
      startLevel: 34,
      demolishers: [
        DemolisherName.DEMOLISHER_EXPIRED,
        DemolisherName.DEMOLISHER_BAILIFF,
        DemolisherName.DEMOLISHER_HEAVY_GUNNER,
        DemolisherName.DEMOLISHER_NOX,
      ],
    },
  ],
  [
    MissionName.TAMU_KUVA_FORTRESS,
    {
      displayName: MissionName.TAMU_KUVA_FORTRESS,
      logName: "TAMU",
      startLevel: 35,
      demolishers: [
        DemolisherName.DEMOLISHER_BAILIFF,
        DemolisherName.DEMOLISHER_HEAVY_GUNNER,
        DemolisherName.DEMOLISHER_NOX,
        DemolisherName.DEMOLISHER_KUVA_GUARDIAN,
      ],
    },
  ],
  [
    MissionName.APOLLO_LUA,
    {
      displayName: MissionName.APOLLO_LUA,
      logName: "APOLLO",
      startLevel: 35,
      demolishers: [
        DemolisherName.DEMOLISHER_ANTI_MOA,
        DemolisherName.DEMOLISHER_BURSA,
        DemolisherName.DEMOLISHER_HYENA,
        DemolisherName.DEMOLISHER_MACHINIST,
      ],
    },
  ],
]);
