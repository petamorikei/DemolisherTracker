import { ConduitState } from "./ConduitState";

export enum ConduitColor {
  RED = "A",
  BLUE = "B",
  CYAN = "C",
  WHITE = "D",
}

export type ConduitIndex = 1 | 2 | 3 | 4;

export class Conduit {
  private _color: ConduitColor | undefined;
  private _state: ConduitState;
  private _index: ConduitIndex | undefined;
  private _effect: number | undefined;

  constructor() {
    this._color = undefined;
    this._state = ConduitState.INACTIVE;
    this._index = undefined;
    this._effect = undefined;
  }

  get color() {
    return this._color;
  }

  set color(color: ConduitColor | undefined) {
    this._color = color;
  }

  get state() {
    return this._state;
  }

  set state(state: ConduitState) {
    this._state = state;
  }

  set index(index: ConduitIndex) {
    this._index = index;
  }
}
