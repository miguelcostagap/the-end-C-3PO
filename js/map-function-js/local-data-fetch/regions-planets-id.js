// regions on the left and planetsIds on the right
const regionsPlanets = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 8, 9]
  };
  
  // retrieve an array of planet ids based on a given region id
  export function getArrayById(id) {
    if (regionsPlanets.hasOwnProperty(id)) {
      return regionsPlanets[id];
    } else {
      return null; 
    }
  }