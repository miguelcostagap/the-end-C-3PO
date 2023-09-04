// regions on the left and planetsIds on the right
const planetImgArray = {
    1: ["https://i.ibb.co/kBnj1Mz/Tatooine-03.png"],
    2: ["https://i.ibb.co/qYXLGXY/Alderaan-03.png"],
    3: ["https://i.ibb.co/QvcGQtD/Yavin-IV-03.png"],
    4: ["https://i.ibb.co/3WMBcrJ/Hoth-03.png"]
  };
  
  // retrieve an array of planet ids based on a given region id
  export function getPlanetImg(id) {
    if (planetImgArray.hasOwnProperty(id)) {
      return planetImgArray[id];
    } else {
      return null; 
    }
  }