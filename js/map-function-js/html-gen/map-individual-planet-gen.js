export function mapIndividualPlanetGen(planet, planetImg) {
    let mapPlanetPageHtml = `
    <div class="planet-container">
        <div class="planet-general">
            <div class="planet-image">
                <img src="${planetImg}" alt="Planet Image">
            </div>
            <div class="planet-details">
                <h2>${planet.name}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor urna non elit fringilla aliquam.
                </p>
                <div class="planet-statistics">
                    <p>Population: ${planet.population}</p>
                    <p>Surface Area: 510.1 million square kilometers</p>
                    <p>Distance from Sun: 149.6 million kilometers</p>
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
 