export function mapExplorerGen() {
    let mapExplorerGenHtml = `
    <div class="mapExplorerCoords">
    <div class="grid-container">
        <div class="grid-background"></div>
        <div class="overlay-image" id="overlay-image">
            <img src="./assets/img/zone-all.png" alt="">
        </div>
        <div class="div1" id="region1">
            <svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <polygon class="hoverable" points="35,15 46,9 55,12 51,17 56,19 48,23 49,25 40,25 54,30 37,28 32,30 26,27 37,23 " data-region-id="1"/>
            </svg>
        </div>
        <div class="div2" id="region2"> <!-- Updated id to "region2" -->
            <svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <polygon class="hoverable" points="35,35 46,39 55,42 51,47" data-region-id="2"/>
            </svg>
        </div>
    </div>
</div>
    `;
    return mapExplorerGenHtml
}





