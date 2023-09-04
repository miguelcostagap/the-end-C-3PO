import { getArrayById } from '../local-data-fetch/regions-planets-id.js';
import { getPlanetImg } from '../local-data-fetch/image-link-fetch.js';

import { mapPlanetListGen } from '../html-gen/map-planet-list-gen.js';
import { mapIndividualPlanetGen } from '../html-gen/map-individual-planet-gen.js';

function fetchPlanetsData(planetsArray, isItIndividual) {
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

                let planetImg = getPlanetImg(planetIndex);

                console.log("img link " + planetImg);

                if (isItIndividual) {
                    let htmlPremise = mapIndividualPlanetGen(data, planetImg);
                    htmlPlanetInfo += htmlPremise;
                    console.log(htmlPlanetInfo);
                } else {
                    let htmlPremise = mapPlanetListGen(data,planetIndex, planetImg);
                    htmlPlanetInfo += htmlPremise;
                    console.log(htmlPlanetInfo);

                }

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

    return fetchPlanetsData(planetArray, false).then(htmlPlanetInfo => {
        return htmlPlanetInfo;
    });
}

export function genPlanetPageIndividual(id) {

    let planetId = [id];

    return fetchPlanetsData(planetId, true).then(htmlPlanetInfo => {
        console.log("what is being passed = " + htmlPlanetInfo);
        return htmlPlanetInfo;
    });
}