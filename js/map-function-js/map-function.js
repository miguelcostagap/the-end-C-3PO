import { genPlanetList } from './api-fetch/planet-list-fetch.js';
import { mapHomeGen } from './html-gen/map-home-gen.js';
import { mapExplorerGen } from './html-gen/map-explorer-gen.js';

/*
** Variables
*/

// general

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

    // This can be initialized here if "region1" is part of the home map
    const toPlanetList = document.getElementById("region1");
    if (toPlanetList) {
        toPlanetList.addEventListener('click', displayPlanetList);
    }

    mapContentToDisplay.addEventListener("click", async function(event) {
        // Check if the clicked element has the class "hoverable"
        if (event.target.classList.contains("hoverable")) {
            try {
                const mapHomeHtml = await genPlanetList(1);
                mapContentToDisplay.innerHTML = mapHomeHtml;
                console.log("hereFUUUUUUK " + mapHomeHtml);
            } catch (error) {
                console.error("Error:", error);
            }
        }
    });
    
}

function displayPlanetList() {
    console.log("nice");
    const mapHomeHtml = genPlanetList(1);
    mapContentToDisplay.innerHTML = mapHomeHtml;
}

document.body.addEventListener('click', (event) => {
    if (event.target.matches('.div1')) {
        console.log("fuck yeah");
    }
});
