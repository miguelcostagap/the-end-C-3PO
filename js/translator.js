
const Translator = (() => {
    const template = `
        <div class="translator-container">
            <h2>Star Wars Translator</h2>
            <select id="languageSelector">
                <option value="yoda">Yodish</option>
                <option value="sith">Sith</option>
                <option value="Gungan">Gungan</option>
                <option value="huttese">Huttese</option>
                <option value="mandalorian">Mandalorian</option>
                <option value="cheuhn">Cheuhn</option>
            </select>

            <div class="layout-container">


                <div class="col-1">
                    <textarea id="inputText" placeholder="Enter your text here..."></textarea>
                </div>
                

                <div class="col-3">
                    <div id="outputBox" placeholder="Translation will appear here..."></div>
                </div>


            </div>

            <button id="translateButton" class="cta">Translate</button>

        </div>
    `;

    function translateText() {
        const inputText = document.getElementById('inputText').value;
        const language = document.getElementById('languageSelector').value;

        if (!inputText.trim()) {
            showNotification('Please enter text to translate.', 'error');
            return;
        }

        const endpoint = `https://api.funtranslations.com/translate/${language}.json?text=${encodeURIComponent(inputText)}`;

        showSpinner();

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                if (data && data.contents && data.contents.translated) {
                    document.getElementById('outputBox').innerText = data.contents.translated;
                } else {
                    showNotification('Translation failed. Please try again.', 'error');
                }
            })
            .catch(error => {
                showNotification('An error occurred. Please try again later.', 'error');
            })
            .finally(() => {
                // Hide spinner
                hideSpinner();
            });
    }

    function init() {
        const contentContainer = document.querySelector('.content-container');
        contentContainer.innerHTML = template;

        const translateButton = document.getElementById('translateButton');
        translateButton.addEventListener('click', translateText);
    }

    return {
        init: init
    };

})();
