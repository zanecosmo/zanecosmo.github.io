const contactButton = document.querySelector(".contact-button");
const portfolioButton = document.querySelector(".portfolio-button");
const logoButton = document.querySelector(".logo");

contactButton.addEventListener("click", () => window.scroll(0, 2669));
portfolioButton.addEventListener("click", () => window.scroll(0, 1404));
logoButton.addEventListener("click", () => window.scroll(0, 0));

const senderIdentifier = "ZANE";

const inputs = {
    name:  document.querySelector(".name-input"),
    email: document.querySelector(".email-input"),
    message: document.querySelector(".message-input")
};

const sendButton = document.querySelector(".submit-button");

const hasNoCharacters = (string) => {
    for (char of string) {if (char !== " ") return false};
    return true;
};

const extractText = () => {
    const message = {identifier: senderIdentifier};

    for (const input in inputs) {
        
        if (inputs[input].value.length === 0) {
            message[input] = "NO ENTRY";
            break;
        };

        if (hasNoCharacters(inputs[input].value)) {
            message[input] = "NO ENTRY";
            break;
        };

        message[input] = inputs[input].value;
    };

    return message;
};

const sendToServer = () => {
    const message = extractText();

    const jsonMessage = {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    };

    const serverURL = "https://zane-smtp-server.herokuapp.com/send-email";
    const testServer = "http://127.0.0.1:4000/send-email"

    fetch(serverURL, jsonMessage)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.log(error));
};

sendButton.addEventListener("click", sendToServer);