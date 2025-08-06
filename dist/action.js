import { canvas, createRoadButton, ctx } from "./elements.js";
const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;
const NODE_COLOR = "#A2A2A2";
const ROAD_SPLINE_COLOR = "#FF0000";
let nodes = [];
let roads = [];
let CREATE_NEW_ROAD = true;
let APPEND_TO_ROAD = false;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const getPosition = (event) => {
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
function lineBetweenNodes(start, end, ctx) {
    ctx.strokeStyle = ROAD_SPLINE_COLOR;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}
function handleCanvasClick(event, ctx) {
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
    ctx.fillRect(x - halfOfPointWidth, y - halfOfPointWidth, pointWidth, pointWidth);
    if (nodes.length > 1) {
        lineBetweenNodes(nodes[nodes.length - 1], nodes[nodes.length - 2], ctx);
    }
}
const action = () => {
    if (ctx === null) {
        console.error("ctx is null");
        return;
    }
    canvas.addEventListener("click", (event) => handleCanvasClick(event, ctx));
    createRoadButton.addEventListener("click", () => handleCreateNewRoad());
    ctx.fillStyle = "#E1E1E1";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
};
action();
//# sourceMappingURL=action.js.map