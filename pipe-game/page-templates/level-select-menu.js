import {behaviors} from "./../behaviors.js";

const levelSelectMenu = {
    title: {
        text: "LEVEL SELECT",
        x: 105,
        y: 50
    },
    areas: [
        {
            name: "level-select-buttons",
            type: "buttons",
            bounds: {
                start: {x: 25, y: 70},
                width: 450,
                height: 240
            },
            grid: {rows: 2, columns: 4},
            padding: 10,
            isModal: false,
            isActive: true,
            units: [],
            unitTemplates: []
        },

        {
            name: "level-select-back-button",
            type: "buttons",
            bounds: {
                start: {x: 35, y: 330},
                width: 100,
                height: 50
            },
            grid: {rows: 1, columns: 1},
            padding: 0,
            isModal: false,
            isActive: true,
            units: [],
            unitTemplates: [
                {
                    name: "level-select-back-button",
                    text: {value: "BACK", style: "20px sans-serif"},
                    behavior: function() {behaviors["page-close-out"]()},
                    clickable: true
                }
            ]
        }
    ]
}

export {levelSelectMenu};