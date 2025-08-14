export const joinRoad: HTMLButtonElement = document.getElementById(
  "join-road",
) as HTMLButtonElement;
export const createRoadButton: HTMLButtonElement = document.getElementById(
  "create-road",
) as HTMLButtonElement;
export const canvas: HTMLCanvasElement = document.createElement("canvas");
document.body.append(canvas);

export const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
