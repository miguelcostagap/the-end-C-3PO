import { genPlanetList } from './api-fetch/planet-list-fetch.js';
import { mapHomeGen } from './html-gen/map-home-gen.js';
import { mapExplorerGen } from './html-gen/map-explorer-gen.js';
import { genPlanetPageIndividual } from './api-fetch/planet-list-fetch.js';

/*
** Variables
*/

// export map functions general

export function loadMapHomeContent() {
    const dynamicContent = document.querySelector('.dynamic-content .content-container');
    dynamicContent.innerHTML = mapHomeGen();
    initializeMapHomeListeners();
}



function initializeMapHomeListeners() {
    const toMapExplorer = document.getElementById("galaxy-map");
    const mapHomeGalaxyImg = document.querySelector("#galaxy-map img");
    const mapContentToDisplay = document.getElementById("map-function-content");


    toMapExplorer.addEventListener('click', () => {
        mapHomeGalaxyImg.classList.add("transition-effect");
        setTimeout(() => {
            const planetGalaxyMapHtml = mapExplorerGen();
            mapContentToDisplay.innerHTML = planetGalaxyMapHtml;
            mapHomeGalaxyImg.classList.remove("transition-effect");
        }, 600);
    });

    // Since "toHome" is part of the explorer, this should be initialized when explorer is loaded
    const toHome = document.getElementById("home");
    if (toHome) {
        toHome.addEventListener('click', () => {
            const mapHomeHtml = mapHomeGen();
            mapContentToDisplay.innerHTML = mapHomeHtml;
        });
    }


    mapContentToDisplay.addEventListener("click", async function (event) {
        // Check if the clicked element has the class "hoverable"
        if (event.target.classList.contains("hoverable")) {
            try {
                const mapHomeHtml = await genPlanetList(1);
                mapContentToDisplay.innerHTML = mapHomeHtml;
            } catch (error) {
                console.error("Error:", error);
            }
        }
    });

 
    mapContentToDisplay.addEventListener("click", async function (event) {
        if (event.target.classList.contains("planet-button")) {

            try {

                const planetId = event.target.dataset.planetId;
                const mapHomeHtml = await genPlanetPageIndividual(planetId);
                mapContentToDisplay.innerHTML = mapHomeHtml;
            } catch (error) {
                console.error("Error:", error);
            }
        }
    });

   

    let overlayImage;

    function updateDocElements(){
        overlayImage  = document.getElementById("overlay-image")
    }
    
    mapContentToDisplay.addEventListener("mouseover", async function (event) {
        // Check if the clicked element has the class "hoverable"
        if (event.target.classList.contains("hoverable")) {
            updateDocElements();
            try {
                const regionId = event.target.dataset.regionId;
                overlayImage.innerHTML=regionHighlightImages[regionId];

            } catch (error) {
                console.error("Error:", error);
            }
        }
    });

    mapContentToDisplay.addEventListener("mouseout", async function (event) {
        // Check if the clicked element has the class "hoverable"
        if (event.target.classList.contains("hoverable")) {
            updateDocElements();
            try {
                const regionId = event.target.dataset.regionId;
                overlayImage.innerHTML=regionHighlightImages[0];

            } catch (error) {
                console.error("Error:", error);
            }
        }
    });

    const regionHighlightImages = [
        '<img src="./assets/img/zone-all.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">',
        '<img src="./assets/img/zone1.png" alt="">'
    ];

}