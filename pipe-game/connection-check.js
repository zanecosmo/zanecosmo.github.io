import { getCurrentPage } from "./state.js";

let connectedUnits = []; // start-permanent unit(s) get pushed here from button-helpers: extractState

const cullDisconnected = () => {
    const index = connectedUnits.map(unit => unit.occupiedBy.slot)
                    .findIndex(slot => slot.length === 0 || slot[0].type !== "start-permanent");
    if (index !== -1) connectedUnits.splice(index, connectedUnits.length - index);
};

const pushAdjacentIfSo = (fieldUnitIndex, direction) => {
    const adjacentIndex = openings[direction].adjacentIndex(fieldUnitIndex);
    const adjacentUnit = getCurrentPage().areas[0].units[adjacentIndex];
    
    if (openings[direction].hasNoAdjacent(adjacentIndex)) return;
    if (adjacentUnit.occupiedBy.slot.length === 0) return "cull-required";

    const adjacentDirections = adjacentUnit.occupiedBy.slot[0].connections;
    // console.log(adjacentDirections);
    if (openings[direction].adjacentDirectionIsClosed(adjacentDirections)) return "cull-required";

    if (!connectedUnits.includes(adjacentUnit)) connectedUnits.push(adjacentUnit);
};

const openings = { // "adj-" = "adjacent"
    top: {
        adjacentIndex: (unitIndex) => unitIndex - 8,
        hasNoAdjacent: (adjUnit, _adjIndex) => adjUnit === undefined,
        adjacentDirectionIsClosed: (connections) => connections[2].bottom !== true,
    },
    right: {
        adjacentIndex: (unitIndex) => unitIndex + 1,
        hasNoAdjacent: (adjUnit, adjIndex) => adjUnit === undefined || adjIndex % 8 === 0,
        adjacentDirectionIsClosed: (connections) => connections[3].left !== true
    },
    bottom: {
        adjacentIndex: (unitIndex) => unitIndex + 8,
        hasNoAdjacent: (adjUnit, _adjIndex) => adjUnit === undefined,
        adjacentDirectionIsClosed: (connections) => connections[0].top !== true,
    },
    left: {
        adjacentIndex: (unitIndex) => unitIndex - 1,
        hasNoAdjacent: (adjUnit, adjIndex) => adjUnit === undefined || (adjIndex + 1) % 8 === 0,
        adjacentDirectionIsClosed: (connections) => connections[1].right !== true,
    }
};

const checkForWin = () => {
    let cullState = "";
    
    for (let i = 0; i < connectedUnits.length; i++) {
        if (connectedUnits[i].occupiedBy.slot[0] === undefined) break;

        const connections = connectedUnits[i].occupiedBy.slot[0].connections;
        for (let j = 0; j < connections.length; j++) {

            for (const direction in connections[j]) {
                if (connections[j][direction]) {
                    
                    cullState = pushAdjacentIfSo(connectedUnits[i].occupiedBy.name, direction);
                    
                    if (cullState === "cull-required") {
                        cullDisconnected();
                        return false;
                    };

                    if (connectedUnits[connectedUnits.length - 1].occupiedBy.slot[0].type === "end-permanent") {
                        console.log("LEVEL COMPLETE");
                        return true;
                    };
                };
            };
        };
    };
};

export { checkForWin, connectedUnits };