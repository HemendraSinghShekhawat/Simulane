import type { IPoint } from "../types/core.js";

export class Road {
  start: IPoint;
  end: IPoint;
  constructor(start: IPoint, end: IPoint) {
    this.start = start;
    this.end = end;
  }
}

export class StraightRoad extends Road {
  constructor(start: IPoint, end: IPoint) {
    super(start, end);
  }
}
