import { canvas, createRoadButton, ctx, joinRoad } from "./elements.js";
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
const joinNodes = (arr) => {
    if (ctx !== null) {
        if (arr.length > 1) {
            arr.forEach((_, index) => {
                if (index !== 0) {
                    lineBetweenNodes(nodes[index - 1], nodes[index], ctx);
                }
            });
        }
    }
};
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
}
const action = () => {
    if (ctx === null) {
        console.error("ctx is null");
        return;
    }
    canvas.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleCanvasClick(event, ctx);
    });
    joinRoad.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        joinNodes(nodes);
    });
    createRoadButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleCreateNewRoad();
    });
    ctx.fillStyle = "#E1E1E1";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
};
action();
//# sourceMappingURL=action.js.map