import { DemolisherName } from "../DemolisherName";
import { Faction } from "../Faction";

interface DemolisherInfo {
  displayName: DemolisherName;
  identifier: string;
  faction: Faction;
  baseHealth: number;
  baseArmor: number;
  baseShield: number;
  imagePath: string;
}

export const demolisherInfoMap = new Map<DemolisherName, DemolisherInfo>([
  [
    DemolisherName.DEMOLISHER_DEVOURER,
    {
      displayName: DemolisherName.DEMOLISHER_DEVOURER,
      identifier: "DemoDevourerAgent",
      faction: Faction.GRINEER,
      baseHealth: 2500,
      baseArmor: 50,
      baseShield: 0,
      imagePath: "./img/DemolisherDevourer.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_EXPIRED,
    {
      displayName: DemolisherName.DEMOLISHER_EXPIRED,
      identifier: "DemoExpiredAgent",
      faction: Faction.GRINEER,
      baseHealth: 1500,
      baseArmor: 100,
      baseShield: 0,
      imagePath: "./img/DemolisherExpired.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_BAILIFF,
    {
      displayName: DemolisherName.DEMOLISHER_BAILIFF,
      identifier: "DisruptionCharger",
      faction: Faction.GRINEER,
      baseHealth: 2000,
      baseArmor: 200,
      baseShield: 0,
      imagePath: "./img/DemolisherBailiff.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_HEAVY_GUNNER,
    {
      displayName: DemolisherName.DEMOLISHER_HEAVY_GUNNER,
      identifier: "DisruptionMinigunBombard",
      faction: Faction.GRINEER,
      baseHealth: 2000,
      baseArmor: 200,
      baseShield: 0,
      imagePath: "./img/DemolisherHeavyGunner.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_NOX,
    {
      displayName: DemolisherName.DEMOLISHER_NOX,
      identifier: "DisruptionNoxAgent",
      faction: Faction.GRINEER,
      baseHealth: 2500,
      baseArmor: 50,
      baseShield: 0,
      imagePath: "./img/DemolisherNox.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_KUVA_GUARDIAN,
    {
      displayName: DemolisherName.DEMOLISHER_KUVA_GUARDIAN,
      identifier: "DisruptionRoyalGuardAgent",
      faction: Faction.GRINEER,
      baseHealth: 2500,
      baseArmor: 150,
      baseShield: 0,
      imagePath: "./img/DemolisherKuvaGuardian.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_ANTI_MOA,
    {
      displayName: DemolisherName.DEMOLISHER_ANTI_MOA,
      identifier: "DisruptionLaserDiscBipedAgent",
      faction: Faction.CORPUS,
      baseHealth: 2000,
      baseArmor: 100,
      baseShield: 800,
      imagePath: "./img/DemolisherAntiMoa.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_BURSA,
    {
      displayName: DemolisherName.DEMOLISHER_BURSA,
      identifier: "DisruptionRiotMoaAgent",
      faction: Faction.CORPUS,
      baseHealth: 2000,
      baseArmor: 100,
      baseShield: 800,
      imagePath: "./img/DemolisherBursa.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_HYENA,
    {
      displayName: DemolisherName.DEMOLISHER_HYENA,
      identifier: "DisruptionHyenaAgent",
      faction: Faction.CORPUS,
      baseHealth: 1500,
      baseArmor: 50,
      baseShield: 700,
      imagePath: "./img/DemolisherHyena.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_MACHINIST,
    {
      displayName: DemolisherName.DEMOLISHER_MACHINIST,
      identifier: "DisruptionRiotMoaAgent",
      faction: Faction.CORPUS,
      baseHealth: 2000,
      baseArmor: 0,
      baseShield: 700,
      imagePath: "./img/DemolisherMachinist.png",
    },
  ],
  [
    DemolisherName.DEMOLYST_HEQET,
    {
      displayName: DemolisherName.DEMOLYST_HEQET,
      identifier: "AmalgamCorpusSniperBossAgent",
      faction: Faction.CORPUS,
      baseHealth: 2000,
      baseArmor: 0,
      baseShield: 800,
      imagePath: "./img/DemolystHeqet.png",
    },
  ],
  [
    DemolisherName.DEMOLYST_MACHINIST,
    {
      displayName: DemolisherName.DEMOLYST_MACHINIST,
      identifier: "AmalgamCarrusPilotBossAgent",
      faction: Faction.CORPUS,
      baseHealth: 2000,
      baseArmor: 0,
      baseShield: 800,
      imagePath: "./img/DemolystMachinist.png",
    },
  ],
  [
    DemolisherName.DEMOLYST_MOA,
    {
      displayName: DemolisherName.DEMOLYST_MOA,
      identifier: "AmalgamMoaBossAgent",
      faction: Faction.CORPUS,
      baseHealth: 2000,
      baseArmor: 0,
      baseShield: 800,
      imagePath: "./img/DemolystMOA.png",
    },
  ],
  [
    DemolisherName.DEMOLYST_SATYR,
    {
      displayName: DemolisherName.DEMOLYST_SATYR,
      identifier: "AmalgamMoaSatyrBossAgent",
      faction: Faction.CORPUS,
      baseHealth: 2000,
      baseArmor: 0,
      baseShield: 800,
      imagePath: "./img/DemolystSatyr.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_BOILER,
    {
      displayName: DemolisherName.DEMOLISHER_BOILER,
      identifier: "DisruptionBoilerAgent",
      faction: Faction.INFESTED,
      baseHealth: 3000,
      baseArmor: 0,
      baseShield: 0,
      imagePath: "./img/DemolisherBoiler.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_CHARGER,
    {
      displayName: DemolisherName.DEMOLISHER_CHARGER,
      identifier: "DisruptionQuadrupedAgent",
      faction: Faction.INFESTED,
      baseHealth: 2500,
      baseArmor: 0,
      baseShield: 0,
      imagePath: "./img/DemolisherCharger.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_JUGGERNAUT,
    {
      displayName: DemolisherName.DEMOLISHER_JUGGERNAUT,
      identifier: "DisruptionJuggernautAgent",
      faction: Faction.INFESTED,
      baseHealth: 3000,
      baseArmor: 50,
      baseShield: 0,
      imagePath: "./img/DemolisherJuggernaut.png",
    },
  ],
  [
    DemolisherName.DEMOLISHER_THRASHER,
    {
      displayName: DemolisherName.DEMOLISHER_THRASHER,
      identifier: "DisruptionAncientTankAgent",
      faction: Faction.INFESTED,
      baseHealth: 3250,
      baseArmor: 0,
      baseShield: 0,
      imagePath: "./img/DemolisherThrasher.png",
    },
  ],
]);
