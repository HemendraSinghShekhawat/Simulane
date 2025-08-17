import type { RoadType } from "./road.ts";

export interface IPoint {
  x: number;
  y: number;
}

export interface INode extends IPoint {
  id: number;
  type: "node";
  elevation: number;
  connectedTo: IPoint[];
}

export interface IRoad {
  start: IPoint;
  end: IPoint;
  length: number;
  direction: number;
  type: RoadType;
}
