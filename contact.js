const sendButton = document.querySelector(".submit-button");
const acceptButton = document.querySelector(".accept-button");
const affirmationScreen = document.querySelector(".affirmation-screen");

const senderIdentifier = "ZANE";

const inputs = {
    name:  document.querySelector(".name-input"),
    email: document.querySelector(".email-input"),
    message: document.querySelector(".message-input")
};


const hasNoCharacters = (string) => {
    for (char of string) {if (char !== " ") return false};
    return true;
};

const extractFormText = () => {
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

const onSuccessResponse = () => affirmationScreen.classList.add("visible");

const returnToPage = () => {
    for (const input in inputs) inputs[input].value = ""
    affirmationScreen.classList.remove("visible");
};

const sendToServer = () => {
    const message = extractFormText();

    const jsonMessage = {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    };

    const serverURL = "https://email.zanecosmo.com/send-email";
    // const testServer = "http://127.0.0.1:4000/send-email"

    fetch(serverURL, jsonMessage)
        .then(res => res.json())
        .then(_res => onSuccessResponse())
        .catch(error => console.log(error));
};

sendButton.addEventListener("click", sendToServer);
acceptButton.addEventListener("click", returnToPage);