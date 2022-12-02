import eventHandlers from "./event-handlers.js";
import render from "./render.js";
import {pages} from "./page-templates/pages-object.js";
import {populateAreas, generateSlotTemplates, generateLevelButtonTemplates} from "./generation-tools.js";
import {pageQueue} from "./state.js";

pageQueue.push(pages["game-menu"]);


const canvas = document.getElementById("screen");
generateLevelButtonTemplates()
generateSlotTemplates("field");
generateSlotTemplates("inventory");
populateAreas(pages);
canvas.addEventListener("mousemove", eventHandlers.onMouseMove);
canvas.addEventListener("click", eventHandlers.onClick);
render();

