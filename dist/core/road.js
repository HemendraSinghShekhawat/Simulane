export class Road {
    start;
    end;
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
export class StraightRoad extends Road {
    constructor(start, end) {
        super(start, end);
    }
}
//# sourceMappingURL=road.js.map