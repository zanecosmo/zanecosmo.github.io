const canvas = document.getElementById("screen");
const c = document.getElementById("screen").getContext("2d");
const screenColor = "rgb(190, 0, 190)";
const renderColor = "rgb(170, 255, 0)";
const hoverColor = "rgb(250, 60, 200)";

const rotateUnit = (unit) => {
    const bounds = unit.bounds;
    c.translate(bounds.start.x + bounds.width / 2, bounds.start.y + bounds.width / 2);
    c.rotate((unit.occupiedBy.slot[unit.occupiedBy.slot.length - 1].rotation * 90) * Math.PI/180);
    c.translate(-1*(bounds.start.x + bounds.width / 2), -1*(bounds.start.y + bounds.width / 2));
};

const rotateShadow = (mouseUnit, hoveredUnit) => {
    const bounds = hoveredUnit.bounds;
    c.translate(bounds.start.x + bounds.width / 2, bounds.start.y + bounds.width / 2);
    c.rotate((mouseUnit.occupiedBy.slot[0].rotation * 90) * Math.PI/180);
    c.translate(-1*(bounds.start.x + bounds.width / 2), -1*(bounds.start.y + bounds.width / 2));
};

export default {
    screen: () => {
        c.fillStyle = screenColor;
        c.fillRect(0, 0, canvas.width, canvas.height);
    },
    clearScreen: () => {
        c.clearRect(0, 0, canvas.width, canvas.height);
    },
    title: function(title) {
        c.beginPath();
        c.fillStyle = renderColor;
        c.font = "20px sans-serif";
        c.textBaseline = "middle",
        c.textAlign = "center",
        c.fillText(title.text, title.x, title.y);
    },
    menuBox: function() {
        c.lineWidth = 1.5;
        c.strokeStyle = renderColor;
        // c.globalAlpha = .25;
        
        c.beginPath();
        c.moveTo(100.5, 0);
        c.lineTo(100.5, 400);
        c.moveTo(0, 199.5);
        c.lineTo(100, 199.5);
        c.stroke();
        c.closePath();
        
        // c.globalAlpha = 1;
    },
    itemShadow: function(mouseUnit, hoveredUnit) {
        const pieceType = mouseUnit.occupiedBy.slot[0].type;
        const X = hoveredUnit.bounds.start.x;
        const Y = hoveredUnit.bounds.start.y;
        const padding = hoveredUnit.padding;
        const depth = (hoveredUnit.bounds.width - (padding *2)) / 6;

        c.globalAlpha = .5;
        c.strokeStyle = hoverColor;
        c.fillStyle = hoverColor;
        
        c.save()
        c.beginPath();
        rotateShadow(mouseUnit, hoveredUnit);
        this.itemPaths[pieceType](hoveredUnit.bounds.width, X, Y, padding, depth);
        c.stroke();
        c.restore(); 
        
        c.globalAlpha = 1;
        c.strokeStyle = renderColor;
        c.fillStyle = renderColor;
        
    },
    status: function(color, buttonBounds, status) {
        c.beginPath();
        c.fillStyle = color;
        c.textAlign = "right";
        c.fillText(
            status,
            buttonBounds.start.x + buttonBounds.width - 4,
            buttonBounds.start.y + (buttonBounds.height / 2)
        );
        c.closePath();
    },
    button: function(unit, hoveredUnit) {
        let borderColor = renderColor;
        let boxColor = screenColor;
        let textColor = renderColor;
        const button = unit.occupiedBy;
        let text = button.text.value;
        const bounds = button.bounds;
        const start = bounds.start;
        const buttonIsLocked = unit.occupiedBy.clickable === false;
    
        if (buttonIsLocked) c.globalAlpha = .6;
        else if (unit === hoveredUnit) {
            boxColor = renderColor;
            textColor = screenColor;
        };
        
        c.beginPath();
        c.fillStyle = boxColor;
        c.fillRect(start.x, start.y, bounds.width, bounds.height);
        c.closePath();
    
        c.beginPath();
        c.strokeStyle = borderColor;
        c.lineWidth = 2;
        c.strokeRect(start.x, start.y, bounds.width, bounds.height);
        c.closePath();
    
        c.beginPath();
        c.fillStyle = textColor;
        c.lineWidth = 2;
        c.textBaseline =  "middle";
        c.textAlign = unit.name === "select-level-button" ? "left" : "center";
        c.font = button.text.style;
        c.fillText(buttonIsLocked ? "LOCKED" : text, button.text.x, button.text.y + 2);
        c.closePath();
    
        c.textAlign = "left";
        c.globalAlpha = 1;
    
        if (unit.name === "select-level-button") {
            this.status(textColor, bounds, button.status);
        };
    },

    itemPaths: {
        ["end-cap"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + width - padding, Y + padding + depth);
            c.lineTo(X + padding + depth, Y + padding + depth);
            c.lineTo(X + padding + depth, Y + width - padding - depth);
            c.lineTo(X + width - padding, Y + width - padding - depth);
        },
        ["two-way"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + padding, Y + depth + padding);
            c.lineTo(X - padding + width, Y + depth + padding);
            c.moveTo(X + padding, Y + width - depth - padding);
            c.lineTo(X - padding + width, Y + width - depth - padding);
        },
        ["three-way"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + padding, Y + padding + depth);
            c.lineTo(X + width - padding, Y + padding + depth);
            c.moveTo(X + padding, Y + width - padding - depth);
            c.lineTo(X + padding + depth, Y + width - padding - depth);
            c.lineTo(X + padding + depth, Y + width - padding);
            c.moveTo(X + width - padding, Y + width - padding - depth);
            c.lineTo(X + width - padding - depth, Y + width - padding - depth);
            c.lineTo(X + width - padding - depth, Y + width - padding);
        },
        ["four-way"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + padding, Y + padding + depth);
            c.lineTo(X + padding + depth, Y + padding + depth);
            c.lineTo(X + padding + depth, Y + padding);
            c.moveTo(X + width - padding, Y + padding + depth);
            c.lineTo(X + width - padding - depth, Y + padding + depth);
            c.lineTo(X + width - padding - depth, Y + padding);
            c.moveTo(X + padding, Y + width - padding - depth);
            c.lineTo(X + padding + depth, Y + width - padding - depth);
            c.lineTo(X + padding + depth, Y + width - padding);
            c.moveTo(X + width - padding, Y + width - padding - depth);
            c.lineTo(X + width - padding - depth, Y + width - padding - depth);
            c.lineTo(X + width - padding - depth, Y + width - padding);
        },
        ["elbow"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + padding, Y + depth + padding);
            c.lineTo(X + width - depth - padding, Y + depth + padding);
            c.lineTo(X + width - depth - padding, Y + width - padding);
            c.moveTo(X + padding, Y + width - depth - padding);
            c.lineTo(X + padding + depth, Y + width - depth - padding);
            c.lineTo(X + padding + depth, Y + width - padding);
        },
        ["placeHolder"]: function() {console.log(this.name)},
        ["start-permanent"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + padding, Y + padding + depth);
            c.lineTo(X + width - padding, Y + padding + depth);
            c.moveTo(X + padding, (Y + width) - padding - depth);
            c.lineTo(X + width - padding, (Y + width) - padding - depth);
            c.fillRect(
                X + padding,
                Y + depth + padding,
                (width - (padding * 2)) / 2,
                width - (depth * 2) - (padding * 2)
            );
        },
        ["end-permanent"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + padding, Y + padding + depth);
            c.lineTo(X + width - padding, Y + padding + depth);
            c.moveTo(X + padding, (Y + width) - padding - depth);
            c.lineTo(X + width - padding, (Y + width) - padding - depth);
            c.fillRect(
                X + padding,
                Y + depth + padding,
                (width - (padding * 2)) / 2,
                width - (depth * 2) - (padding * 2)
            );
        },

        ["block-permanent"]: function(width, X, Y, padding, _depth) {
            c.fillStyle = hoverColor;
            c.fillRect(X + padding, Y + padding, width, width);
            c.fillStyle = renderColor;
        }
    },

    stackQuantity: (quantity, x, y) => {
        c.textBaseline = "hanging";
        c.font = "12px sans-serif";
        c.fillStyle = renderColor;
        c.fillText(quantity, x + 1, y + 2)
        c.textBaseline = "middle";
    },

    item: function(unit) {
        const X = unit.bounds.start.x;
        const Y = unit.bounds.start.y;
        const padding = unit.padding;
        const depth = (unit.bounds.width - (padding *2)) / 6;
        const pieceType = unit.occupiedBy.slot[0].type;
        
        c.strokeStyle = renderColor;
        c.fillStyle = renderColor;
        c.lineWidth = 2;

        c.save()
        c.beginPath();
        rotateUnit(unit);
        this.itemPaths[pieceType](unit.bounds.width, X, Y, padding, depth);
        c.stroke();
        c.restore();
    },
};