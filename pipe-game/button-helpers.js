import { hoveredUnit, pageQueue, getCurrentPage } from "./state.js";
import eventHandlers from "./event-handlers.js";
import gameInstance from "./game-instance.js";
import pieceRotations from "./piece-rotations.js";
import rotateDirections from "./rotate-directions.js";
import { connectedUnits } from "./connection-check.js";

const copy = (item) => JSON.parse(JSON.stringify(item));
const pushPageToQueue = (page) => pageQueue.push(page);
const popPageFromQueue = () => pageQueue.pop();
const emptyMouseUnit = () => getCurrentPage().mouseUnit.occupiedBy.slot = [];
const addRotateListener = () => document.addEventListener("keypress", eventHandlers.rotateKeypress);
const removeRotateListener = () => document.removeEventListener("keypress", eventHandlers.rotateKeypress);

const resetGamePageSlots = () => {
    const currentPage = getCurrentPage();
    for (let i = 0; i < currentPage.areas.length; i++) {
        const area = currentPage.areas[i];
        if (area.type !== "slots") continue;
        for (let j = 0; j < area.units.length; j++) {
            area.units[j].occupiedBy.slot = [];
            area.units[j].occupiedBy.clickable = true;
        };
    };
};

const grabItem = () => {
    const grabbedItem = hoveredUnit.occupiedBy.slot.pop();
    getCurrentPage().mouseUnit.occupiedBy.slot.push(grabbedItem);
};

const placeItem = () => {
    const grabbedItem = getCurrentPage().mouseUnit.occupiedBy.slot.pop();
    hoveredUnit.occupiedBy.slot.push(grabbedItem);
};

const unlockNextLevel = (levelIndex, levelSelectMenu) => {
    gameInstance[levelIndex].isUnlocked = true;
    levelSelectMenu.areas[0].units[levelIndex].occupiedBy.clickable = true;
};

const extractState = (levelIndex) => {
    connectedUnits.splice(0, connectedUnits.length);
    const state = gameInstance[levelIndex].state;
    const gamePageAreas = getCurrentPage().areas;
    
    let areaIndex = 0;
    for (const area in state) {;
        
        if (state[area].length === 0)  {
            areaIndex++
            continue;
        };

        for (let i = 0; i < state[area].length; i++) {
            const piece = copy(state[area][i]);
            piece.connections = copy(pieceRotations[piece.type]);

            for (let j = 0; j < piece.rotation; j++) rotateDirections(piece.connections);
            const unit = gamePageAreas[areaIndex].units[piece.position];
            unit.occupiedBy.slot.push(piece);
            if (piece.type.includes("permanent")) unit.occupiedBy.clickable = false;
            if (piece.type !== "start-permanent") continue;
            connectedUnits.push(unit);
        };

        areaIndex++;
    };
};

export {
    pushPageToQueue,
    popPageFromQueue,
    grabItem,
    placeItem,
    extractState,
    addRotateListener,
    removeRotateListener,
    emptyMouseUnit,
    resetGamePageSlots,
    unlockNextLevel
};