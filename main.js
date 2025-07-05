let currentRoad = null;
let lastPoint = null;
let startPoint = null;
let mode = "draw";
let roads = [];
console.log("Hello, World!");

const canvas = document.createElement("canvas");

const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
ctx.width = WIDTH;
ctx.height = HEIGHT;

class Vector {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Road {
  constructor(lane, start, end) {
    this.lane = lane;
    this.start = start;
    this.end = end;
  }
}

class StraightRoad extends Road {
  constructor(lane, start, end) {
    super(lane, start, end);
  }

  getAngle() {
    const dx = this.end.x - this.start.x;
    const dy = this.end.y - this.start.y;
    const theta = Math.atan2(dy, dx);
    return (theta * 180) / Math.PI;
  }

  draw(ctx) {
    ctx.strokeStyle = "rgb(55,55,55)";
    ctx.lineWidth = this.lane * 20;
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.closePath();
    this.drawDivider(ctx);
  }

  drawDivider(ctx) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.closePath();
  }
}

const getClickPoint = (event) => {
  return new Point(event.offsetX, event.offsetY);
};

canvas.addEventListener("mousedown", (event) => {
  let point = getClickPoint(event);
  if (mode === "draw") {
    if (startPoint !== null) {
      lastPoint = point;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      roads.push(new StraightRoad(3, startPoint, lastPoint));
      lastPoint = null;
      startPoint = null;
    } else {
      startPoint = point;
    }
  }
});

canvas.addEventListener("mouseup", () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (let road of roads) {
    ctx.save();
    road.draw(ctx);
    ctx.restore();
  }
});
