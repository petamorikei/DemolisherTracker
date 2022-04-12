import { Conduit } from "./Conduit";
import { DemolisherName } from "./DemolisherName";
import { Faction } from "./Faction";
import {
  calcCurrentArmor,
  calcCurrentDamageReduction,
  calcCurrentHealth,
  calcCurrentShield,
} from "./calculator";
import { demolisherInfoRecord } from "./demolisherInfoRecord";

export class Demolisher {
  static statusMultiplier = 1;
  private _displayName: DemolisherName;
  private _faction: Faction;
  private _identifier: string;
  private _conduit: Conduit;
  private _baseLevel: number;
  private _baseHealth: number;
  private _baseArmor: number;
  private _baseShield: number;
  private _currentLevel: number;
  private _currentHealth: number;
  private _currentArmor: number;
  private _currentDamageReduction: number;
  private _currentShield: number;
  private _imagePath: string;

  constructor(displayName: DemolisherName) {
    const demolisherInfo = demolisherInfoRecord[displayName];
    if (typeof demolisherInfo === "undefined") {
      throw new Error(`${displayName} does NOT exist`);
    } else {
      this._displayName = demolisherInfo.displayName;
      this._faction = demolisherInfo.faction;
      this._identifier = demolisherInfo.identifier;
      this._conduit = new Conduit();
      this._baseLevel = 1;
      this._baseHealth = demolisherInfo.baseHealth;
      this._baseArmor = demolisherInfo.baseArmor;
      this._baseShield = demolisherInfo.baseShield;
      this._currentLevel = 1;
      this._currentHealth = calcCurrentHealth(
        this._baseHealth,
        this._currentLevel,
        this._baseLevel,
        Demolisher.statusMultiplier
      );
      this._currentArmor = calcCurrentArmor(
        this._baseArmor,
        this._currentLevel,
        this._baseLevel,
        Demolisher.statusMultiplier
      );
      this._currentDamageReduction = calcCurrentDamageReduction(
        this._currentArmor
      );
      this._currentShield = calcCurrentShield(
        this._baseShield,
        this._currentLevel,
        this._baseLevel,
        Demolisher.statusMultiplier
      );
      this._imagePath = demolisherInfo.imagePath;
    }
  }

  get displayName() {
    return this._displayName;
  }

  get conduit() {
    return this._conduit;
  }

  set conduit(conduit: Conduit) {
    this._conduit = conduit;
  }

  get currentLevel() {
    return this._currentLevel;
  }

  /**
   * Set current level of demolisher.
   * This also updates its health, armor, damage reduction and shield.
   */
  set currentLevel(currentLevel: number) {
    this._currentLevel = currentLevel;
    this._currentHealth = calcCurrentHealth(
      this._baseHealth,
      this._currentLevel,
      this._baseLevel,
      Demolisher.statusMultiplier
    );
    this._currentArmor = calcCurrentArmor(
      this._baseArmor,
      this._currentLevel,
      this._baseLevel,
      Demolisher.statusMultiplier
    );
    this._currentDamageReduction = calcCurrentDamageReduction(
      this._currentArmor
    );
    this._currentShield = calcCurrentShield(
      this._baseShield,
      this._currentLevel,
      this._baseLevel,
      Demolisher.statusMultiplier
    );
  }

  get currentHealth() {
    return this._currentHealth;
  }

  get currentArmor() {
    return this._currentArmor;
  }

  get currentDamageReduction() {
    return this._currentDamageReduction;
  }

  get currentShield() {
    return this._currentShield;
  }

  get imageData() {
    return this._imagePath;
  }
}
