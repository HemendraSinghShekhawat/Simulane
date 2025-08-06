import { Vector2D } from "./core/vector.js";
export const canvas = document.createElement("canvas");
document.body.append(canvas);
const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
const getPosition = (event) => {
    const { x, y } = event;
    return { x, y };
};
const lineBetweenNodes = (start, end, ctx) => {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
};
function main() {
    if (ctx === null) {
        console.error("ctx is null, nothing to render");
        return;
    }
    const nodes = [];
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
        ctx.fillRect(x - halfOfPointWidth, y - halfOfPointWidth, pointWidth, pointWidth);
        nodes.forEach((el, index) => {
            if (index !== 0) {
                if (nodes[index - 1] !== undefined && nodes[index] !== undefined) {
                    lineBetweenNodes(nodes[index - 1], nodes[index], ctx);
                }
            }
        });
    });
    ctx.fillStyle = "#E1E1E1";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}
main();
//# sourceMappingURL=eventListeners.js.map