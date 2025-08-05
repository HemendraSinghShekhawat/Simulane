let isWorldSaved: boolean = false;

console.log("Hello, World!");


function saveTheWorld(): string {
  if (isWorldSaved) {
    return `Too late, world has already been saved`;
  } else {
    isWorldSaved = true;
    return `Hurray, you just saved the world`;
  }
}

export default saveTheWorld
