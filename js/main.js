document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('translatorCard').addEventListener('click', () => {
        Translator.init();
    });

    document.getElementById('chatCard').addEventListener('click', () => {
        fetchCharacters();
    });

    urlFragment();
});