const API_KEY = ""; // Replace with your Gemini API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

let studentInfoProvided = false; // Flag to check if student info has been provided
let studentInfo = {};

const SYSTEM_INSTRUCTION ="You are a friendly and knowledgeable Mathematics tutor for secondary school students. Your goal is to explain mathematical concepts in a clear, step-by-step manner. Always encourage them to practice and ask follow-up questions.";

document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.querySelector("#chatbot button");
    sendButton.addEventListener("click", sendMessage);

    const userInputField = document.getElementById("userInput");
    userInputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    displayMessage(userInput, "user");
    document.getElementById("userInput").value = "";
    document.getElementById("loader").style.display = "block"; // Show loader

    let promptText = SYSTEM_INSTRUCTION;

    // If student info hasn't been provided, ask for it
    if (!studentInfoProvided) {
        promptText += `\nUser: ${userInput}\nAI: Please provide your name, class, and index number to personalize your learning experience.`;
    } else {
        // Proceed with the student's question if the info is provided
        promptText += `\nUser: ${userInput}\nAI:`;
    }

    let data = { contents: [{ parts: [{ text: promptText }] }] };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        let result = await response.json();
        let botReply = result?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";

        // If the AI asks for the student's information, save it
        if (botReply.includes("Please provide your name, class, and index number")) {
            // Assuming the response is asking for the student info, you can update the flag here
            studentInfoProvided = false;
        } else {
            displayMessage(botReply, "bot");
        }

    } catch (error) {
        console.error("Error:", error);
        displayMessage("Error fetching response. Try again later.", "bot");
    } finally {
        document.getElementById("loader").style.display = "none"; // Hide loader
    }
}

function displayMessage(text, sender) {
    let chatBox = document.getElementById("chatBox");
    let messageElement = document.createElement("p");
    messageElement.classList.add(sender + "-message");
    messageElement.innerText = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
