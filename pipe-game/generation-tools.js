import gameInstance from "./game-instance.js";
import {gameplayPage} from "./page-templates/gameplay-page.js";
import {levelSelectMenu} from "./page-templates/level-select-menu.js";
import {behaviors} from "./behaviors.js";

const generateSlotTemplates = (areaName) => {
    const fieldArea = gameplayPage.areas[areaName === "field" ? 0 : 1];
    const totalUnits = fieldArea.grid.columns * fieldArea.grid.rows;
    for (let i = 0; i < totalUnits; i++) {
        const fieldSlotTemplate = {
            name: i,
            text: null,
            slot: [],
            behavior: behaviors[`${areaName}-action`],
            clickable: true
        };
        fieldArea.unitTemplates.push(fieldSlotTemplate);
    };
};

const generateLevelButtonTemplates = () => {
    const buttonArea = levelSelectMenu.areas[0];
    for (let i = 0; i < gameInstance.length; i++) {
        const levelTemplate = {
            name: `level-${i + 1}-button`,
            text: {value: `${i + 1}`, style: "20px sans-serif"},
            behavior: () => behaviors["select-given-level"](gameplayPage, i),
            clickable: gameInstance[i].isUnlocked ? true : false
        };
        buttonArea.unitTemplates.push(levelTemplate);
    };
};

const generateButton = (unitTemplate, unit, unitNumber) => {
    const button = {
        name: unitTemplate.name,
        bounds: {
            start: {
                x: unit.bounds.start.x + unit.padding,
                y: unit.bounds.start.y + unit.padding
            },
            width: unit.bounds.width - (unit.padding * 2),
            height: unit.bounds.height - (unit.padding * 2)
        },
        behavior: unitTemplate.behavior,
        clickable: unitTemplate.clickable
    };

    if (unitTemplate.name === "play-level-button") {
        button.status = levels[unitNumber].status;
        button.text = {
            value: levels[unitNumber].number,
            x: unit.bounds.start.x + (unit.padding * 2),
            y: unit.bounds.start.y + (unit.padding * 2),
            style: unitTemplate.text.style,
        };
        return button;
    };

    button.text = {
        value: unitTemplate.text.value,
        x: button.bounds.start.x + (button.bounds.width / 2),
        y: button.bounds.start.y + (button.bounds.height / 2),
        style: unitTemplate.text.style,
    };
    
    return button;
};

const generateSlot = (unitTemplate, unit) => {
    const slot = {
        name: unitTemplate.name,
        bounds: {
            start: {
                x: unit.bounds.start.x,
                y: unit.bounds.start.y
            },
            width: unit.bounds.width,
            height: unit.bounds.height
        },
        behavior: unitTemplate.behavior,
        clickable: unitTemplate.clickable,
        slot: []
    };

    return slot;
};

const buildBasicUnit = (area, column, row) => {
    const unitWidth = area.bounds.width / area.grid.columns;
    const unitHeight = area.bounds.height /area.grid.rows;
    
    return {
        areaType: area.type,
        bounds: {
            start: {
                x: (area.bounds.start.x + (column * unitWidth)),
                y: (area.bounds.start.y + (row * unitHeight))
            },
            width: unitWidth,
            height: unitHeight,
        },
        padding: area.padding
    };
};

const generateUnits = (area) => {
    for (let row = 0; row < area.grid.rows; row++) {
        for (let column = 0; column < area.grid.columns; column++) {
            const index = area.grid.columns * row + column;
            const unitObject = buildBasicUnit(area, column, row);
            
            if (area.unitTemplates.length === 0) continue;

            area.type === "slots"
                ? unitObject.occupiedBy = generateSlot(area.unitTemplates[index], unitObject)
                : area.type === "buttons"
                    ? unitObject.occupiedBy = generateButton(area.unitTemplates[index], unitObject, index)
                    : console.log("TEXT INPUT PLACEHOLDER");

            area.units.push(unitObject);
        };
    };
};

const populateAreas = (pages) => {
    for (const pagename in pages) {
        const page = pages[pagename];
        for (let i = 0; i < page.areas.length; i++) generateUnits(page.areas[i]);
    };
};

export {populateAreas, generateSlotTemplates, generateLevelButtonTemplates};