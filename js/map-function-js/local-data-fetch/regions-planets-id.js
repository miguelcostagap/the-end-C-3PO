// regions on the left and planetsIds on the right
const regionsPlanets = {
    1: [1, 2, 3, 4],
    2: [4, 5],
    3: [7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18],
    2: [19, 24],
    2: [20, 21, 22, 23],
    2: [25, 26, 27],
    2: [28, 29, 30, 31],
    2: [32, 33],
    2: [34, 35],
    2: [36, 37],
    2: [38, 39],
    2: [40, 41],
    2: [42, 43, 46],
    2: [44, 45],

  };
  
  // retrieve an array of planet ids based on a given region id
  export function getArrayById(id) {
    if (regionsPlanets.hasOwnProperty(id)) {
      return regionsPlanets[id];
    } else {
      return null; 
    }
  }