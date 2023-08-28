async function fetchCharacters() {
    try {
        const response = await fetch('https://swapi.dev/api/people/');
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

function displayCharacters(characters) {
    const characterList = document.querySelector('.content-container');
    characterList.innerHTML = ''; 

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character-item';
        characterDiv.innerHTML = `
        <section class="character-list">
            <h3>${character.name}</h3>
            <p>Height: ${character.height} cm</p>
            <p>Mass: ${character.mass} kg</p>
            <!-- Add more details if needed -->
        </section>
        `;
        characterDiv.addEventListener('click', () => {
            displayCharacterProfile(character);
        });
        characterList.appendChild(characterDiv);
    });
}

function displayCharacterProfile(character) {
    const dynamicContent = document.querySelector('.content-container');
    dynamicContent.innerHTML = `
        <div class="character-profile">
            <h2>${character.name}</h2>
            <p><strong>Birth Year:</strong> ${character.birth_year}</p>
            <p><strong>Eye Color:</strong> ${character.eye_color}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Hair Color:</strong> ${character.hair_color}</p>
            <p><strong>Height:</strong> ${character.height} cm</p>
            <p><strong>Mass:</strong> ${character.mass} kg</p>
            <p><strong>Skin Color:</strong> ${character.skin_color}</p>
            <!-- Add more details as needed -->
            <button id="startConversation">Start a Conversation</button>
        </div>
    `;

    document.getElementById('startConversation').addEventListener('click', () => {
        initiateVirtualConversation(character);
    });
    
}

function initiateVirtualConversation(character) {
    const dynamicContent = document.querySelector('.content-container');
    dynamicContent.innerHTML = `
        <div class="chat-interface">
            <!-- This will be the chat UI where the user can converse with the character -->
        </div>
    `;

    // Initialize the chat interface and other necessary logic
    // This will be further implemented in the next step (Virtual Conversation)
}
