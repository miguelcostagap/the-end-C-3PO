import { urlFragment } from '/js/url-fragment.js';
import { loadMapHomeContent } from './map-function-js/map-function.js';

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('mapCard').addEventListener('click', () => {
        loadMapHomeContent();
    });
    

    document.getElementById('translatorCard').addEventListener('click', () => {
        Translator.init();
    });

    document.getElementById('chatCard').addEventListener('click', () => {
        fetchCharacters();
    });

    document.getElementById("starshipCard").addEventListener("click", () => {
        loadSpaceshipFeature();
    });

    urlFragment();
});