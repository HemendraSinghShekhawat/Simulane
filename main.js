const globalStateStore = {
  currentRoad: null,
  lastPoint: null,
  mode: "draw",
  roads: [],
};

const canvas = document.createElement("canvas");

const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
ctx.width = WIDTH;
ctx.height = HEIGHT;
console.log(ctx);

class Vector {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

class Point {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

class Road {
  constructor(lane, start, end) {
    this.lane = lane;
    this.start = start;
    this.end = end;
  }
}

const getClickPoint = (event) => {
  let point = globalStateStore.lastPoint;
  if (point) {
    globalStateStore.lastPoint = null;
    return new Point(point.start, { x: event.offsetY, y: event.offsetY });
  }
  return new Point(
    { x: event.offsetY, y: event.offsetY },
    { x: event.offsetY, y: event.offsetY },
  );
};

document.addEventListener("mousedown", (event) => {
  let point = getClickPoint(event);
  if (globalStateStore.lastPoint === null) {
    globalStateStore.lastPoint = point;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(
      globalStateStore.lastPoint.start.x,
      globalStateStore.lastPoint.start.y,
    );
    ctx.lineTo(
      globalStateStore.lastPoint.end.x,
      globalStateStore.lastPoint.end.y,
    );
    ctx.stroke();
    ctx.closePath();
  } else {
    globalStateStore.lastPoint = null;
  }
});
