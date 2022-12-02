let pageQueue = [];
let getCurrentPage = () => pageQueue[pageQueue.length - 1];

let hoveredUnit = null;
const setHoveredUnit = (newUnit) => hoveredUnit = newUnit;

const currentLevel = {value: 0};

export {hoveredUnit, setHoveredUnit, pageQueue, getCurrentPage, currentLevel};