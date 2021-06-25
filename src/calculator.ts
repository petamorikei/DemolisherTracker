const calcS1 = function (currentLevel: number, baseLevel: number) {
  const t = (currentLevel - baseLevel - 70) / 10;
  const s1 =
    currentLevel - baseLevel < 70
      ? 0
      : currentLevel - baseLevel > 80
      ? 1
      : 3 * t ** 2 - 2 * t ** 3;
  return s1;
};

const calcHealth = function (
  baseHealth: number,
  currentLevel: number,
  baseLevel: number,
  missionModeMultiplier: number
): number {
  const s1 = calcS1(currentLevel, baseLevel);
  const f1 = 1 + 0.015 * (currentLevel - baseLevel) ** 2;
  const f2 = 1 + ((24 * 5 ** 0.5) / 5) * (currentLevel - baseLevel) ** 0.5;
  const healthMultiplier = f1 * (1 - s1) + f2 * s1;
  return Math.round(baseHealth * healthMultiplier * missionModeMultiplier);
};

const calcArmor = function (
  baseArmor: number,
  currentLevel: number,
  baseLevel: number,
  missionModeMultiplier: number
): number {
  const s1 = calcS1(currentLevel, baseLevel);
  const f1 = 1 + 0.005 * (currentLevel - baseLevel) ** 1.75;
  const f2 = 1 + 0.4 * (currentLevel - baseLevel) ** 0.75;
  const armorMultiplier = f1 * (1 - s1) + f2 * s1;
  return Math.round(baseArmor * armorMultiplier * missionModeMultiplier);
};

// 装甲によるダメージ軽減率(%)
const calcDamageReduction = function (armor: number): number {
  return Math.round((armor / (armor + 300)) * 100 * 100) / 100;
};

const calcShield = function (
  baseShield: number,
  currentLevel: number,
  baseLevel: number,
  missionModeMultiplier: number
): number {
  const s1 = calcS1(currentLevel, baseLevel);
  const f1 = 1 + 0.02 * (currentLevel - baseLevel) ** 1.75;
  const f2 = 1 + 1.6 * (currentLevel - baseLevel) ** 0.75;
  const shieldMultiplier = f1 * (1 - s1) + f2 * s1;
  return Math.round(baseShield * shieldMultiplier * missionModeMultiplier);
};

const exportObject = {
  calcHealth,
  calcArmor,
  calcDamageReduction,
  calcShield,
};

export default exportObject;
