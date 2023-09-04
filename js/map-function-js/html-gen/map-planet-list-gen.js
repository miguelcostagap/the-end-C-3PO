export function mapPlanetListGen(planet, index, planetImg) {
   let mapPlanetListHtml = `
<div class="planet-list-container" id=${index}>
<div class="planet-list">
    <div class="planetInfo" data-planet-id="1">

        <div class="planet-content">
            <img class="planet-image" src="${planetImg}" alt="Planet 1" >
            <table>
                <tr>
                    <td>Planet Name</td>
                    <td>Distance</td>
                    <td>Population</td>
                </tr>
                <tr>
                    <td>${planet.name}</td>
                    <td>${planet.terrain}</td>
                    <td>${planet.population}<</td>
                </tr>
            </table>
        </div>
        
        <button id="invisible-button" class="planet-button" data-planet-id=${index}>Click Me</button>

    </div>
</div>
</div>
  `;
  return mapPlanetListHtml;
}

