import { loadMapHomeContent } from './map-function-js/map-function.js';

window.addEventListener('hashchange', urlFragment);


export function urlFragment() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const featureName = this.querySelector('h2').textContent.toLowerCase().replace(/ /g, '-');
            window.location.hash = featureName;
        });
    });

    const hash = window.location.hash.replace('#', '');

    if (hash) {
        featureCards.forEach(card => card.classList.remove('selected'));

        const selectedCard = Array.from(featureCards).find(card => {
            const featureName = card.querySelector('h2').textContent.toLowerCase().replace(/ /g, '-');
            return featureName === hash;
        });

        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        const dynamicContent = document.querySelector('.dynamic-content .content-container');
        switch (hash) {
            case 'map':
                loadMapHomeContent();
                break;
            case 'translator':
                Translator.init();
                break;
            case 'chat':
                fetchCharacters();
                break;
            case 'starship-rentals':
                loadSpaceshipFeature();
                break;
            default:
                dynamicContent.innerHTML = `
                    <h2>Welcome to Star Wars C-3PO Travel Console</h2>
                    <p>Select a feature from above to explore the galaxy far, far away!</p>
                `;
        }
    }
};


