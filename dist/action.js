import { canvas, createRoadButton, ctx, joinRoad } from "./elements.js";
const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;
const BACKGROUND_COLOR = "#111111";
const NODE_COLOR = "#A2A2A2";
const ROAD_SPLINE_COLOR = "#FF0000";
let nodes = [];
let roads = [];
let boundingBox = [0, 0, WIDTH, HEIGHT];
let scaleX = 1;
let scaleY = 1;
let CREATE_NEW_ROAD = true;
let APPEND_TO_ROAD = false;
let NODE_ID = 0;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const joinNodes = (arr) => {
    console.log(arr);
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
        id: NODE_ID,
        type: "node",
        elevation: 0,
        x,
        y,
        connectedTo: nodes.length > 0 ? [nodes[nodes.length - 1]] : [],
    });
    NODE_ID++;
    if (nodes.length >= 2 &&
        nodes[nodes.length - 2] !== undefined &&
        Array.isArray(nodes[nodes.length - 2]?.connectedTo)) {
        nodes[nodes.length - 2].connectedTo = [
            ...nodes[nodes.length - 2].connectedTo,
            nodes[nodes.length - 1],
        ];
    }
    if (nodes.length === 2 && Array.isArray(nodes[0]?.connectedTo)) {
        nodes[0].connectedTo = [nodes[1]];
    }
    ctx.fillStyle = NODE_COLOR;
    const pointWidth = 10;
    const halfOfPointWidth = pointWidth / 2;
    ctx.fillRect(x - halfOfPointWidth, y - halfOfPointWidth, pointWidth, pointWidth);
}
const drawGrid = (ctx, width, height) => {
    if (!ctx)
        return;
    for (let i = width; i < canvas.height; i += width) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.closePath();
        ctx.stroke();
    }
    for (let i = height; i < canvas.width; i += width) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeText(`${i}`, i, i + 10);
    }
};
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
    canvas.addEventListener("wheel", (event) => {
        if (!ctx)
            return;
        const { offsetX, offsetY, deltaX, deltaY } = event;
        console.log(offsetX, offsetY, event);
        scaleX += 1 * (deltaX >= 0 ? 1 : -1);
        scaleY += 1 * (deltaY >= 0 ? 1 : -1);
        ctx.restore();
        console.log(ctx);
        ctx.scale(2, 2);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.strokeStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        drawGrid(ctx, width, height);
        ctx.save();
        console.log(ctx.getTransform());
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
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.strokeStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = "blue";
    let width = 100;
    let height = 100;
    drawGrid(ctx, width, height);
};
action();
//# sourceMappingURL=action.js.map