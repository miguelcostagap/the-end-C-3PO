export function mapPlanetListGen(planet) {
   let mapPlanetListHtml = `
<div class="planet-list-container">
<div class="planet-list">
    <div class="planetInfo">
        <div class="planet-content">
            <img class="planet-image" src="https://thumbs2.imgbox.com/89/4b/XjgG7xmp_t.png" alt="Planet 1" />
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
    </div>
</div>
</div>
  `;
  return mapPlanetListHtml;
}

