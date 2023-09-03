export function mapHomeGen(){
   let mapHomeGenHtml = `
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

<div id="galaxy-map">
    <div class="map-container">
        <img src="assets/img/01map.jpg" id="map">
    </div>
    <div id="exploreButton">explore destinations</div>
</div>
  `;
    return mapHomeGenHtml;
}

