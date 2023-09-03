async function fetchCharacters() {
    const cachedCharacters = sessionStorage.getItem('characters');

    if (cachedCharacters) {
        displayCharacters(JSON.parse(cachedCharacters));
        return;
    }

    showSpinner(); 

    try {
        const response = await fetch('https://swapi.dev/api/people/');
        const data = await response.json();

        sessionStorage.setItem('characters', JSON.stringify(data.results));

        displayCharacters(data.results);
    } catch (error) {
        console.error("Error fetching characters:", error);
    } finally {
        hideSpinner(); 
    }
}


function displayCharacters(characters) {
    const characterList = document.querySelector('.content-container');

    characterList.classList.add('fade-out');

    setTimeout(() => {
        characterList.innerHTML = '<h2>Chat</h2>';

        characters.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.className = 'character-item';
            characterDiv.innerHTML = `
            <section class="character-list">
                <h3>${character.name}</h3>
            </section>
            `;
            characterDiv.addEventListener('click', () => {
                displayCharacterProfile(character);
            });
            characterList.appendChild(characterDiv);
        });

        characterList.classList.remove('fade-out');
    }, 300);
}


    

function displayCharacterProfile(character) {
    const dynamicContent = document.querySelector('.content-container');
    dynamicContent.classList.add('fade-out');

    setTimeout(() => {
        dynamicContent.innerHTML = `
            <h2>Chat</h2>
            <button id="backToList">Back to List</button>
            <div class="character-profile">
                <h3>${character.name}</h3>
                <p><strong>Birth Year:</strong> ${character.birth_year}</p>
                <p><strong>Eye Color:</strong> ${character.eye_color}</p>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <p><strong>Hair Color:</strong> ${character.hair_color}</p>
                <p><strong>Height:</strong> ${character.height} cm</p>
                <p><strong>Mass:</strong> ${character.mass} kg</p>
                <p><strong>Skin Color:</strong> ${character.skin_color}</p>
                <!-- Add more details as needed -->
                <button id="startConversation" class="cta">Start a Conversation</button>
            </div>
        `;

        document.getElementById('backToList').addEventListener('click', () => {
            fetchCharacters();
        });


        document.getElementById('startConversation').addEventListener('click', () => {
            initiateVirtualConversation(character);
        });



        dynamicContent.classList.remove('fade-out');
    }, 300);

    const chatButton = document.createElement('button');
    chatButton.innerText = "Start a Conversation";
    chatButton.addEventListener('click', () => {
        initiateVirtualConversation(character);
    });
    dynamicContent.appendChild(chatButton);
}




    



function initiateVirtualConversation(character) {
    const dynamicContent = document.querySelector('.content-container');
    dynamicContent.innerHTML = `
        <div class="chat-interface">
            <h2>Chatting with ${character.name}</h2>
            <div class="chat-messages" id="chatMessages"></div>
            <input type="text" id="userMessage" placeholder="Type your message...">
            <button id="sendMessage" class="cta">Send</button>
        </div>
    `;

    document.getElementById('sendMessage').addEventListener('click', () => {
        const userMessage = document.getElementById('userMessage').value;
        sendToChatGPT(character, userMessage);
    });
}


async function sendToChatGPT(character, userMessage) {
    displayChatMessage("user", userMessage);
    const apiUrl = "https://vercel-openai-proxy-seven.vercel.app/api/openai";

    const prompt = `You are ${character.name} from Star Wars. Respond as if you are in character limit your answers to one to two sentences.`;
    const fullMessage = `${prompt} ${userMessage}`;

    const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: fullMessage
        }],
        temperature: 0.7
    };    

    displayChatMessage("assistant", "...", character.name);
    const loadingMessage = document.getElementById('chatMessages').lastChild;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        loadingMessage.remove();

        const data = await response.json();
        document.getElementById('userMessage').value = '';
        displayChatMessage("assistant", data.choices[0].message.content, character.name);

    } catch (error) {
        loadingMessage.remove();
        console.error("Error sending message to ChatGPT:", error);
    }
}



function displayChatMessage(role, message, characterName) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = role;

    if (role === "user") {
        messageDiv.innerText = `You: ${message}`;
    } else {
        messageDiv.innerText = `${characterName}: `;
        const span = document.createElement('span');
        span.className = 'typing-effect';
        span.innerText = ''; // Start with an empty string
        messageDiv.appendChild(span);
        simulateTyping(span, message, 0); // Call the simulateTyping function
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function simulateTyping(element, message, index) {
    const words = message.split(' '); // Split the message into words
    if (index < words.length) {
        element.innerText += (index > 0 ? ' ' : '') + words[index]; // Add a space before appending the word, except for the first word
        setTimeout(() => simulateTyping(element, message, index + 1), 25 * words[index].length); // Multiply the timeout by the word's length for a dynamic typing speed
    }
}

