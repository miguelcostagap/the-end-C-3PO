const map = document.getElementById("map");
const generalContent = document.getElementById("map-function-content");
const initialImg = document.querySelector(".galaxy-map img");

const contentToDisplay = [
    `
    <div class="map02">
        <img src="assets/img/02map.jpg" id="map">
        <img src="assets/img/zone1.png" class="overlay" id="zone1">
        <img src="assets/img/zone2.png" class="overlay" id="zone2">
        <img src="assets/img/zone-all.png" class="overlay" id="zone-all">
    </div>
    `, `
    <div class="quick-planner">
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
                    <input type="submit" value="Search Warp">
                </form>
            </div>
        </div>

        <div class="galaxy-map">
        <div class="map-container">
        <img src="assets/img/01map.jpg" id="map">
    </div>
    <div id="exploreButton">explore destinations</div>
        </div>
    `];

map.addEventListener('click', () => {
    initialImg.classList.add("transition-effect");

    setTimeout(() => {
        generalContent.innerHTML = contentToDisplay[0];
        initialImg.classList.remove("transition-effect");
    }, 600);
});

const home = document.getElementById("home");

home.addEventListener('click', () => {
    generalContent.innerHTML = contentToDisplay[1];
});