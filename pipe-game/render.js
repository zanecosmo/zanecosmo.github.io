import draw from "./draw.js";
import {hoveredUnit} from "./state.js";
import {getCurrentPage} from "./state.js";

const unitTypeRenderers = {
    ["buttons"]: (unit, hoveredUnit) => draw.button(unit, hoveredUnit),
    ["slots"]: (unit, hoveredUnit) => {
        const mouseUnit = getCurrentPage().mouseUnit;
        
        if (hoveredUnit !== null &&
            hoveredUnit.areaType === "slots" &&
            mouseUnit.occupiedBy.slot.length > 0 && 
            hoveredUnit.occupiedBy.slot.length === 0
            ) draw.itemShadow(mouseUnit, hoveredUnit);

        if (unit.occupiedBy.slot.length > 0) draw.item(unit)
    },
    ["text-input"]: () => console.log("TEXT INPUT")
};

const renderUnits = (area) => {
    for (let i = 0; i < area.units.length; i++) {
        const unit = area.units[i];
        const start = unit.bounds.start;
        if (area.name === "inventory" && unit.occupiedBy.slot.length > 1) {
            draw.stackQuantity(unit.occupiedBy.slot.length, start.x, start.y);
        };
        unitTypeRenderers[area.type](unit, hoveredUnit);
    };
};

const renderAreas = (currentPage) => {
    for (let i = 0; i < currentPage.areas.length; i++) {
        if (currentPage.areas[0].name === "field") draw.menuBox();
        renderUnits(currentPage.areas[i]);
    };
};

export default () => {
    const currentPage = getCurrentPage();
    draw.clearScreen();
    draw.screen();
    renderAreas(currentPage);
    if (currentPage.title !== null) return draw.title(currentPage.title);
    if (currentPage.mouseUnit.occupiedBy.slot.length > 0) draw.item(currentPage.mouseUnit);
};