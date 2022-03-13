const menu = document.querySelector(".menu");
const dropdown = document.querySelector(".dropdown");

const dropdownButtons = {
    homeButton: document.querySelector(".dropdown-home"),
    contactButton: document.querySelector(".dropdown-contact"),
    resumeButton: document.querySelector(".dropdown-resume"),
    portfolioButton: document.querySelector(".dropdown-portfolio"),
    lilnkedInButton: document.querySelector(".dropdown-linkedIn"),
    githubButton: document.querySelector(".dropdown-github"),

};

const retractMenu = () => dropdown.style.height = "0vh";
const deployMenu = () => dropdown.style.height = "100vh";

const toggleDropdown = () => {
    isMenuDeployed ? retractMenu() : deployMenu();
    isMenuDeployed = !isMenuDeployed;
};

let isMenuDeployed = false;

const addButtonListeners = () => {
    for (button in dropdownButtons) {
        const menuButton = dropdownButtons[button];
        menuButton.addEventListener("click", toggleDropdown);
    };
};

menu.addEventListener("click", toggleDropdown);
addButtonListeners();