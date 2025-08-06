import type { INode } from "./types/core.js";

import { canvas, createRoadButton, ctx } from "./elements.js";

const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;
const NODE_COLOR = "#A2A2A2";
const ROAD_SPLINE_COLOR = "#FF0000";

let nodes: INode[] = [];
let roads: INode[][] = [];

let CREATE_NEW_ROAD = true;
let APPEND_TO_ROAD = false;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const getPosition = (event: PointerEvent) => {
  const { x, y } = event;
  return { x, y };
};

const handleCreateNewRoad = () => {
  CREATE_NEW_ROAD = true;
  APPEND_TO_ROAD = false;
  if (nodes.length > 0) {
    /* TODO: Add directions to road */
    roads.push(nodes);
    nodes = [];
  }
};

function lineBetweenNodes(
  start: INode,
  end: INode,
  ctx: CanvasRenderingContext2D,
) {
  ctx.strokeStyle = ROAD_SPLINE_COLOR;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function handleCanvasClick(event: PointerEvent, ctx: CanvasRenderingContext2D) {
  let { x, y } = getPosition(event);

  nodes.push({
    type: "node",
    elevation: 0,
    x,
    y,
  });

  ctx.fillStyle = NODE_COLOR;

  const pointWidth = 10;
  const halfOfPointWidth = pointWidth / 2;
  ctx.fillRect(
    x - halfOfPointWidth,
    y - halfOfPointWidth,
    pointWidth,
    pointWidth,
  );

  if (nodes.length > 1) {
    lineBetweenNodes(
      nodes[nodes.length - 1] as INode,
      nodes[nodes.length - 2] as INode,
      ctx,
    );
  }
}

const action = () => {
  if (ctx === null) {
    console.error("ctx is null");
    return;
  }

  canvas.addEventListener("click", (event) =>
    handleCanvasClick(event, ctx as CanvasRenderingContext2D),
  );
  createRoadButton.addEventListener("click", () => handleCreateNewRoad());

  ctx.fillStyle = "#E1E1E1";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
};

action();
