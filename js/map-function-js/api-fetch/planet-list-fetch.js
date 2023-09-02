import { getArrayById } from '../local-data-fetch/regions-planets-id.js'; 
import { mapPlanetListGen } from '../html-gen/map-planet-list-gen.js'; 

let htmlPlanetInfo = "";

function mergeHtml(html){
htmlPlanetInfo+=html;
}

function fetchPlanetsData(planetsArray) {
    let htmlPlanetInfo = '';
    const fetchPromises = planetsArray.map(element => {
        let planetIndex = element;
        const planetApi = 'https://swapi.dev/api/planets/' + planetIndex + '/';
        return fetch(planetApi)
            .then(response => {
                if (!response.ok) {
                    throw new Error('ERROR 500: Something went wrong with the network connection!');
                }
                return response.json();
            })
            .then(data => {
                let htmlPremise = mapPlanetListGen(data);
                htmlPlanetInfo += htmlPremise;
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    });

    return Promise.all(fetchPromises)
        .then(() => htmlPlanetInfo)
        .catch(error => {
            console.error('Promise.all error:', error);
        });
}

export function genPlanetList(region) {
    let planetArray = getArrayById(region);

    return fetchPlanetsData(planetArray).then(htmlPlanetInfo => {
        console.log("what is being passed = " + htmlPlanetInfo);
        return htmlPlanetInfo;
    });
}
