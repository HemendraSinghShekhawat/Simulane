import type { RoadType } from "./road.ts";
export interface IPoint {
    x: number;
    y: number;
}
export interface INode extends IPoint {
    type: "node";
    elevation: number;
}
export interface IRoad {
    start: IPoint;
    end: IPoint;
    length: number;
    direction: number;
    type: RoadType;
}
//# sourceMappingURL=core.d.ts.map