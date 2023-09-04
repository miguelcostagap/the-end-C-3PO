export function mapIndividualPlanetGen(planet, planetImg) {
    let mapPlanetPageHtml = `
    <div class="planet-container">
        <div class="planet-general">
            <div class="planet-image">
                <img src="${planetImg}" alt="Planet Image">
            </div>
            <div class="planet-details">
                <h2>${planet.name}</h2>
                <p>   
                </p>
                <div class="planet-statistics">
                    <p>---> Rotation Period: ${planet.rotation_period}</p>
                    <p>---> Orbital Period: ${planet.orbital_period}</p>
                    <p>---> Diameter: ${planet.diameter}</p>
                    <p>---> Climate: ${planet.climate}</p>
                    <p>---> Gravity: ${planet.gravity}</p>
                    <p>---> Terrain: ${planet.terrain}</p>
                    <p>---> Surface Water: ${planet.surface_water}</p>
                    <p>---> Population: ${planet.population}</p>
                </div>
            </div>
           
        </div> 

        <div class="quick-planner-options">
            <form>
                <div class="form-group">
                    <label for="from">From:</label>
                    <input type="text" id="from" name="from" placeholder="Departure">
                </div>
                <div class="form-group">
                    <label for="to">To:</label>
                    <input type="text" id="to" name="to" placeholder="Destination">
                </div>
                <div class="form-group">
                    <label for="departure-date">Departure Date:</label>
                    <input type="date" id="departure-date" name="departure-date">
                </div>
                <div class="form-group">
                    <label for="return-date">Return Date:</label>
                    <input type="date" id="return-date" name="return-date">
                </div>
                <input type="submit" class="cta" value="Search Warp">
            </form>
        </div>
    </div>

   `;
   return mapPlanetPageHtml;
 }
 