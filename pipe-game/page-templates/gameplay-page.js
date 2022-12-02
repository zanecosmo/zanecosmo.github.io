import {behaviors} from "./../behaviors.js";
import {levelSelectMenu} from "./level-select-menu.js";

const gameplayPage = {
    title: null,
    mouseUnit: {
        bounds: {
            start: {x: 0, y: 0},
            width: 50,
            height: 50
        },
        padding: 0,
        occupiedBy: {slot: []}
    },
    areas: [
        {
            name: "field",
            type: "slots",
            bounds: {
                start: {x: 100, y: 0},
                width: 400,
                height: 400,
            },
            grid: {
                rows: 8,
                columns: 8,
                rule: function() {return (400/this.columns)}
            },
            padding: 0,
            isModal: false,
            isActive: true,
            units: [],
            unitTemplates: [],
        },

        {
            name: "inventory",
            type: "slots",
            bounds: {
                start: {x: 0, y: 0},
                width: 100,
                height: 200
            },
            grid: {
                rows: 4,
                columns: 2,
                rule: function() {return (100/this.columns)}
            },
            padding: 10,
            isModal: false,
            isActive: true,
            units: [],
            unitTemplates: []
        },
        
        {
            name: "menu",
            type: "buttons",
            bounds: {
                start: {x: 0, y: 200},
                width: 100,
                height: 200,
            },
            grid: {
                rows: 4,
                columns: 1,
                rule: function() {return (100/this.columns)}
            },
            padding: 5,
            isModal: false,
            isActive: true,
            units: [],
            unitTemplates: [
                {
                    name: "restart-button",
                    text: {value: "RESTART", style: "10px sans-serif"},
                    behavior: behaviors["restart-level"],
                    clickable: true
                },

                {
                    name: "level-select-button",
                    text: {value: "LEVELS", style: "10px sans-serif"},
                    behavior: () => behaviors["level-select"](levelSelectMenu),
                    clickable: true
                },

                {
                    name: "exit-to-menu",
                    text: {value: "EXIT", style: "10px sans-serif"},
                    behavior: () => behaviors["page-close-out"](),
                    clickable: true
                },

                {
                    name: "next-level-button",
                    text: {value: "NEXT", style: "10px sans-serif"},
                    behavior: () => behaviors["next-level"](levelSelectMenu),
                    clickable: false
                },
            ]
        }
    ]
};

window.getGameState = () => {
    copy(gameplayPage.areas[0].units
                    .filter(unit => unit.occupiedBy.slot.length > 0)
                    .map(unit => {
                        const slotUnit = unit.occupiedBy.slot[0];
                        delete slotUnit.connections;
                        return slotUnit;
                    }));
};

export {gameplayPage};