import {behaviors} from "./../behaviors.js";
import {gameplayPage} from "./gameplay-page.js";
import {levelSelectMenu} from "./level-select-menu.js";

const gameMenu = {
    title: {
        text: "PIPE-CONNECT",
        x: 250,
        y: 100
    },
    areas: [
        {
            name: "game-menu-buttons",
            type: "buttons",
            bounds: {
                start: {x: 100, y: 120},
                width: 300,
                height: 200,
            },
            grid: {rows: 2, columns: 1},
            padding: 5,
            isModal: false,
            isActive: true,
            units: [],
            unitTemplates: [
                {
                    name: "play-button",
                    text: {value: "PLAY", style: "20px sans-serif"},
                    behavior: function() {behaviors["select-given-level"](gameplayPage, 0)},
                    clickable: true
                },

                {
                    name: "level-select-button",
                    text: {value: "LEVELS", style: "20x sans-serif"},
                    behavior: function() {behaviors["level-select"](levelSelectMenu)},
                    clickable: true
                }
            ]
        }
    ]
};

export {gameMenu};
