import render from "./render.js";
import { pageQueue, getCurrentPage, currentLevel } from "./state.js";
import { hoveredUnit, setHoveredUnit } from "./state.js";
import { checkForWin } from "./connection-check.js";
import {
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
} from "./button-helpers.js";

const behaviors = {    
    ["level-select"]: (levelSelectMenu) => {
        pushPageToQueue(levelSelectMenu);
        render();
    },
    ["select-given-level"]: (gameplayPage, levelIndex) => {
        currentLevel.value = levelIndex;

        if (pageQueue[pageQueue.length - 2] === gameplayPage) popPageFromQueue();
        else if (getCurrentPage() !== gameplayPage) pushPageToQueue(gameplayPage);

        emptyMouseUnit();
        resetGamePageSlots();
        extractState(levelIndex);
        addRotateListener();
        render();
    },
    ["restart-level"]: () => {
        emptyMouseUnit();
        resetGamePageSlots();
        extractState(currentLevel.value);
        render();
    },
    ["next-level"]: function(levelSelectMenu) {
        currentLevel.value++;

        if (currentLevel.value === 8) this["page-close-out"]();
        else {
            resetGamePageSlots();
            emptyMouseUnit();
            unlockNextLevel(currentLevel.value, levelSelectMenu);
            extractState(currentLevel.value);
            getCurrentPage().areas[2].units[3].occupiedBy.clickable = false;
            render();
        };
        
    },
    ["field-action"]: () => {
        const hoveredSlot = hoveredUnit.occupiedBy.slot;
        const mouseSlot = getCurrentPage().mouseUnit.occupiedBy.slot;

        if (hoveredSlot.length === 0) {
            if (mouseSlot.length === 0) return;
            else {
                placeItem();
                if (checkForWin()) getCurrentPage().areas[2].units[3].occupiedBy.clickable = true;
                return render();
            };
        };

        if (hoveredSlot.length > 0) {
            if (mouseSlot.length === 0) {
                grabItem();
                if (checkForWin()) getCurrentPage().areas[2].units[3].occupiedBy.clickable = true;
                render();
            }
            else return render();
        };
    },
    ["inventory-action"]: () => {
        const hoveredSlot = hoveredUnit.occupiedBy.slot;
        const mouseSlot = getCurrentPage().mouseUnit.occupiedBy.slot;

        if (hoveredSlot.length === 0) {
            if (mouseSlot.length === 0) return;
            else {
                placeItem();
                if (checkForWin()) getCurrentPage().areas[2].units[3].occupiedBy.clickable = true;
                return render();
            };
        };

        if (hoveredSlot.length > 0) {
            if (mouseSlot.length === 0) {
                grabItem("inventory");
                if (checkForWin()) getCurrentPage().areas[2].units[3].occupiedBy.clickable = true;
                render();
            }
            else if (mouseSlot[0].type === hoveredSlot[0].type) {
                placeItem("inventory");
                if (checkForWin()) getCurrentPage().areas[2].units[3].occupiedBy.clickable = true;
                render();
            }
            else render();
        };
    },

    ["page-close-out"]: () => {
        if (getCurrentPage().title === null) removeRotateListener();
        popPageFromQueue();
        setHoveredUnit(null);
        render();
    }
};

export {behaviors};