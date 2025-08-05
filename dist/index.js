// soruce of geoJson is wikipedia of geo.json - https://en.wikipedia.org/wiki/GeoJSON
import geoJson from '../geo.json' with { type: 'json' };
console.log(geoJson);
const canvas = document.createElement("canvas");
document.body.append(canvas);
const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d');
function main() {
    if (ctx === null) {
        console.error("ctx is null, nothing to render");
        return;
    }
    ctx.fillStyle = "#E1E1E1";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}
main();
//# sourceMappingURL=index.js.map