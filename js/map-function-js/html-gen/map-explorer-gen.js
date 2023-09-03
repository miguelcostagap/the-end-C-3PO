export function mapExplorerGen() {
    let mapExplorerGenHtml = `
    <div class="mapExplorerCoords">
    <div class="grid-background"> <img src="./assets/img/zone-all.png" alt="" class="overlay-image">

    </div>

    <div class="div1">
        <svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon class="hoverable" points="0,0 50,35 30,45 8,18 20,5"
             />
        </svg>
    </div>

    <div class="div2" id="region1">
        <svg width="100%" height="auto" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon class="hoverable" points="1,0.75 2,1.05 1.2,1.35 0.32,0.54 0.8,0.15"
            onclick="alert('I am click functionality!');"  />
        </svg>
    </div>

    <div class="div3"> </div>
    <div class="div4"> </div>
    <div class="div5"> </div>
    <div class="div6"> </div>
    <div class="div7"> </div>
    <div class="div8"> </div>
    <div class="div9"> </div>
</div>
    `;
    return mapExplorerGenHtml
}





