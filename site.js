const get = selector => document.querySelector(selector);
const getMany = selector => document.querySelectorAll(selector);
const click = (element, callback) => element.addEventListener("click", callback)

let dropDownRevealed = false;

click(get(".menu-face"), () => {
    dropDownRevealed === false
        ? get(".drop-down-unrevealed").classList.add("drop-down-revealed")
        : get(".drop-down-unrevealed").classList.remove("drop-down-revealed")
    dropDownRevealed = !dropDownRevealed;
});