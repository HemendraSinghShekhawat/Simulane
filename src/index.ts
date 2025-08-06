import { Vector2D } from "./core/vector.js";
import type { INode } from "./types/core.js";

export const canvas: HTMLCanvasElement = document.createElement("canvas");
document.body.append(canvas);
const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

const getPosition = (event: PointerEvent) => {
  const { x, y } = event;
  return { x, y };
};

function main() {
  if (ctx === null) {
    console.error("ctx is null, nothing to render");
    return;
  }
  const nodes: INode[] = [];
  canvas.addEventListener("click", (event) => {
    console.log(event);
    let { x, y } = getPosition(event);
    ctx.fillStyle = "#A2A2A2";
    nodes.push({
      type: "node",
      elevation: 0,
      x,
      y,
    });
    console.log(nodes);
    const pointWidth = 10;
    const halfOfPointWidth = pointWidth / 2;
    ctx.fillRect(
      x - halfOfPointWidth,
      y - halfOfPointWidth,
      pointWidth,
      pointWidth,
    );
  });

  ctx.fillStyle = "#E1E1E1";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

main();
