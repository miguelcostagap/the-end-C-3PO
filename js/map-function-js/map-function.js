import { genPlanetList } from './api-fetch/planet-list-fetch.js';
import { mapHomeGen } from './html-gen/map-home-gen.js';
import { mapExplorerGen } from './html-gen/map-explorer-gen.js'

/*
** Variables
*/

// genereal
const mapContentToDisplay = document.getElementById("map-function-content");

// variables in/for map-home html
const toMapExplorer = document.getElementById("galaxy-map");
const mapHomeGalaxyImg = document.querySelector("#galaxy-map img");
let mapHomeHtml;

// variables in/for map-explorer html
const toHome = document.getElementById("home");
let planetGalaxyMapHtml;

// variables in/for planet-list html
let toPlanetList = document.getElementById("region1");

/*
** Event Listeners
*/


// event listeners for map-home

toMapExplorer.addEventListener('click', () => {

    mapHomeGalaxyImg.classList.add("transition-effect");

    mapHomeHtml = mapHomeGen();
    planetGalaxyMapHtml = mapExplorerGen();

    setTimeout(async () => {
        mapContentToDisplay.innerHTML = planetGalaxyMapHtml;
        mapHomeGalaxyImg.classList.remove("transition-effect");
    }, 600);

});


// event listeners for map-explorer

toHome.addEventListener('click', () => {

    mapHomeHtml = mapHomeGen();
    planetGalaxyMapHtml = mapExplorerGen();
    mapContentToDisplay.innerHTML = mapHomeHtml;
});

// event listeners for map-explorer

function displayPlanetList() {
    console.log("nice");
    mapHomeHtml = genPlanetList(1);
    mapContentToDisplay.innerHTML = mapHomeHtml;
}

/*
toPlanetList.addEventListener('click', () => {
    console.log("asfukkkk")
    mapHomeHtml = genPlanetList(1);
    mapContentToDisplay.innerHTML = mapHomeHtml;
    displayPlanetList;
});

*/
document.body.addEventListener('click', (event) => {
    if (event.target.matches('.div1')) {
console.log("fuck yeah");    }
});

document.getElementById("map-function-content").addEventListener("click", async function(event) {
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
