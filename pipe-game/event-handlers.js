import { getCurrentPage, hoveredUnit, setHoveredUnit } from "./state.js";
import { gameplayPage } from "./page-templates/gameplay-page.js";
import rotateDirections from "./rotate-directions.js";
import render from "./render.js";

const areaHoverActions = {
    ["buttons"]: (mousePosition, unit) => {
        if (isInBounds(mousePosition, unit.occupiedBy.bounds)) setHoveredUnit(unit);
        else setHoveredUnit(null);
    },
    ["slots"]: (mousePosition, unit) => {
        setHoveredUnit(unit);
        updateMouseUnitPosition(mousePosition);
    }
};

const updateMouseUnitPosition = (mousePosition) => {
    gameplayPage.mouseUnit.bounds.start.x = mousePosition.x -25;
    gameplayPage.mouseUnit.bounds.start.y = mousePosition.y -25;
};

const isInBounds =  (position, bounds) => {
    if (position.x < bounds.start.x + bounds.width && position.x >= bounds.start.x
        && position.y < bounds.start.y + bounds.height && position.y >= bounds.start.y)
        return true;
    return false;
};

const getPosition = (e) => {
    const canvas = document.getElementById("screen");
    const screen = canvas.getBoundingClientRect();
    const eventPosition = {x: (e.clientX - screen.left), y: (e.clientY - screen.top)};
    return eventPosition;
};

const whichUnit = (area, position) => {
    const unitWidth = area.bounds.width / area.grid.columns;
    const unitHeight = area.bounds.height / area.grid.rows;

    const eventPositionX = position.x - area.bounds.start.x;
    const eventPositionY = position.y - area.bounds.start.y;

    const unitsDeepX = Math.floor(eventPositionX/unitWidth);
    const unitsDeepY = Math.floor(eventPositionY/unitHeight);

    const foundUnit = unitsDeepY*area.grid.columns+unitsDeepX;
    return area.units[foundUnit];
};

const getUnitFromArea = (mousePosition, page) => {
    for (let i = 0; i < page.areas.length; i++) {
        if (page.areas[i].isActive === false) continue;
        if (isInBounds(mousePosition, page.areas[i].bounds)) {
            return whichUnit(page.areas[i], mousePosition);
        };
    };
};

export default {
    onClick: () => {
        if (hoveredUnit === null) return
        if (hoveredUnit.occupiedBy.clickable) hoveredUnit.occupiedBy.behavior();
    },
    
    onMouseMove: (e) => {
        const mousePosition = getPosition(e);
        const unit = getUnitFromArea(mousePosition, getCurrentPage());
        if (unit === undefined || unit.clickable === false) setHoveredUnit(null);
        else areaHoverActions[unit.areaType](mousePosition, unit);
        render();
    },

    rotateKeypress: (e) => {
        if (e.key === " ") {
            const pieceObject = getCurrentPage().mouseUnit.occupiedBy.slot[0];
            if (pieceObject === undefined) return;
            if (pieceObject.rotation === 4) pieceObject.rotation = 0;
            pieceObject.rotation++;
            const connections = getCurrentPage().mouseUnit.occupiedBy.slot[0].connections
            rotateDirections(connections);
            render();
        };
    }
};