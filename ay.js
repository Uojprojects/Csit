const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const API_KEY = "AIzaSyA03vOvdkXe3lzc4AAbRTOAlhEFuvKLrJc";
async function fetchData() {
  

const response = await fetchData(`${API_URL}?key=${API_KEY}`, {
  method: "POST", // Add the proper method
  headers: {
    "Content-Type": "application/json", // Add the proper headers
  },
  body: JSON.stringify({
    // Add the request body as described in https://ai.google.dev/api/rest/v1beta/GenerationConfig
    contents: [
      {
        parts: [
          {
            text: "Write me a story about a cat and a dog", // Add the desired prompt
          },
        ],
      },
    ],
  }),
})};
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent')
.then(response => { // response is defined in here
    if(!response.ok) {
        // Checks if the API request is unsuccessful (i.e The response is not ok).
        throw new Error('Failed to generate Response');
        // If there is an error , an exception is thrown with an error message.
    }
    return response.json(); // or response.text() if needed
})
.then(data => {
    // Process the data here
})
.catch(error => {
    // Handle any errors here
});
    
   async function fetchData() {
    
   
    const data = await response.json();

    // converts the API response to the JSON FORMAT

    return data.candidates[0].content.parts[0].text;

    // Returns the first generated response from the API (The text part of the response).
   }

function cleanMarkdown(text){
// Defines a function 'cleanMarkdown' to remove any markdown formating (like headrers, bold text e.t.c) from the response
return text
.replace(/#{1,6}\s?/g, '')
// remove any markdown error(e.g , #, ##, ###)
.replace(/\*\*/g, '')
// removes bold formating (Double asterisk **).
.replace(/\n{3,}/g, 'n/n')
// limits excessive newlines to a maximum of two (Replaces more than two newlines with two).
.trim();
// Removes any white space from the start and end of the string.
}
function addMessage(message, isUser){
    // Defines a function `addMessage` to add a new message to the chat display.
    //it takes the message(text) and isUser(boolean indiacting whether the message is from the bot or the user).
    const messageElement =document.createElement("div");
    
    messageElement.classList.add('message');

    // Create a new div element for the message and adds the 'message' CSS class.

    messageElement.classList.add(isUser ?'user-message' :'bot-message' );

    const profileImage =document.createElement("img");
    profileImage.classList.add('profile-image');
    profileImage.src= isUser ? 'user.jpeg':'bot.jpg';
    profileImage.alt =isUser ? 'User':'Bot';
   // Create a DOM element for the message content.
   const messageContent = document.createElement('div');
   messageContent.classList.add('message-content');
   // Set the text content, not just the text property
   messageContent.textContent = message;
   //Create the DOM message element
   messageElement.appendChild(profileImage);
   messageElement.appendChild(messageContent);
   chatmesages.appendChild(messageElement);
   chatmesages.scrollTop = chatmesages.scrollHeight;


}
async function handleUserInput() {
    const userMessage = userinput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        userinput.value = '';
        sendButton.disabled = true; // Corrected: assign true
        userinput.disabled = true; // Corrected: assign true
        try {
            const botMessage = await generateResponse(userMessage);
            addMessage(cleanMarkdown(botMessage), false);
        } catch (error) {
            console.error('Error in handleUserInput:', error); // Log the error for debugging
            addMessage('Sorry, I encountered an error. Please try again.', false);
        } finally {
            sendButton.disabled = false;
            userinput.disabled = false;
            userinput.focus();
        }
    }
}
// Wrap your code in a listener that waits for the DOM to load.
document.addEventListener('DOMContentLoaded', function() {
  // your code here.
  const sendButton = document.getElementById("send-button"); // Define the sendButton variable.
  if(sendButton){
    sendButton.addEventListener('click', () => {
       // Add the functionallity here.
    });
  } else {
     console.warn('Could not find element with id: send-button')
  }
  
});