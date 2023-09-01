
alert(' You are connected!\n May the force be with you!');

let results; // Store the results in the global scope
let selectedSpaceshipIndex = -1;

fetch('https://swapi.dev/api/starships/')
  .then(response => response.json())
  .then(data => {
    results = getSpaceships(data);
    renderResult(results);
  });

function getSpaceships(data) {
  return data.results.map(starship => {
    return {
      name: starship.name,
      cost_in_credits: starship.cost_in_credits,
      model: starship.model,
      starship_class: starship.starship_class,
      length: starship.length,
      passengers: starship.passengers,
      crew: starship.crew,
      manufacturer: starship.manufacturer,
      consumables: starship.consumables,
      cargo_capacity: starship.cargo_capacity,
      hyperdrive_rating: starship.hyperdrive_rating,
      max_atmosphering_speed: starship.max_atmosphering_speed,
    };
  });
}



function handleSelect(index) {
  // Deselect the previously selected spaceship, if any
  if (selectedSpaceshipIndex !== -1) {
    let previouslySelectedButton = document.querySelectorAll(".select-button")[selectedSpaceshipIndex];
    previouslySelectedButton.textContent = "Select";
  }

  // Select the new spaceship
  selectedSpaceshipIndex = index;
  let selectedButton = document.querySelectorAll(".select-button")[index];
  selectedButton.textContent = "Selected";
}



function renderResult(results) {
  let resultsContainer = document.querySelector(".results");
  let ul = document.createElement("ul");

  results.forEach((starship, index) => {
    let li = document.createElement("li");
    li.textContent = `${starship.name}`;

    let img = document.createElement("img");
    img.src = `./assets/starships/${encodeURIComponent(starship.name)}.png`;
    img.alt = `${starship.name} Starship`;

    nestedUl = document.createElement("ul");

    for (let attribute in starship) {
      let nestedLi = document.createElement("li");
      nestedLi.textContent = `${attribute}: ${starship[attribute]}`;
      nestedUl.appendChild(nestedLi);
    }

    let selectButton = document.createElement("button");
    selectButton.textContent = "Select";
    selectButton.classList.add("select-button"); // Add a common class

    li.appendChild(img);
    li.appendChild(nestedUl);
    li.appendChild(selectButton);
    ul.appendChild(li);
    ul.appendChild(document.createElement("br"));
  });

  resultsContainer.appendChild(ul);

  // Add event listener for the "Select" buttons using event delegation
  resultsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("select-button")) {
    const selectedButton = event.target;
    const selectedLi = selectedButton.parentElement;
    const selectedIndex = Array.from(ul.children).indexOf(selectedLi);

    handleSelect(selectedIndex);
  }
});
}



document.addEventListener("DOMContentLoaded", function () {
  let filterButton = document.getElementById("filterButton");
  filterButton.addEventListener("click", handleFilter);

  let filterTypeSelect = document.getElementById("filterType");
  let filterValueInput = document.getElementById("filterValue");
  let filterValueMinInput = document.getElementById("filterValueMin");
  let filterValueMaxInput = document.getElementById("filterValueMax");

  let filterAttributeSelect = document.getElementById("filterAttribute");



  // Function to toggle the visibility of input fields based on filter type
  function toggleInputVisibility() {
      if (filterTypeSelect.value === "between") {
          filterValueInput.style.display = "none";
          filterValueMinInput.style.display = "inline-block";
          filterValueMaxInput.style.display = "inline-block";
      } else if (filterTypeSelect.value === "greaterThan") {
        filterValueInput.style.display = "none";
        filterValueMinInput.style.display = "inline-block";
        filterValueMaxInput.style.display = "none";
      } else if (filterTypeSelect.value === "lessThan") {
        filterValueInput.style.display = "none";
        filterValueMinInput.style.display = "none";
        filterValueMaxInput.style.display = "inline-block";
      } else {
        filterValueInput.style.display = "inline-block";
        filterValueMinInput.style.display = "none";
        filterValueMaxInput.style.display = "none";
      }
  }

  // Initial visibility setup
  toggleInputVisibility();

  // Event listener to toggle visibility when filter type changes
  filterTypeSelect.addEventListener("change", toggleInputVisibility);



  // Function to enable/disable filterType options based on the selected attribute
  function updateFilterTypeOptions() {
    let excludedAttributes = ["name", "model", "starship_class", "manufacturer"];
    let selectedAttribute = filterAttributeSelect.value;

    // Enable all filterType options
    filterTypeSelect.querySelectorAll("option").forEach(option => {
        option.disabled = false;
    });

    // Disable filterType options for excluded attributes
    if (excludedAttributes.includes(selectedAttribute)) {
        filterTypeSelect.querySelectorAll("option").forEach(option => {
            if (option.value !== "equal") {
                option.disabled = true;
            }
        });
    }
}

// Initial update when the page loads
updateFilterTypeOptions();

// Event listener to update filterType options when filterAttribute changes
filterAttributeSelect.addEventListener("change", updateFilterTypeOptions);



function handleFilter() {
  let filterAttribute = document.getElementById("filterAttribute").value;
  let filterType = document.getElementById("filterType").value;
  let filterValueInput = document.getElementById("filterValue");
  let filterValue = filterValueInput.value.trim();
  let filterValueMin = parseFloat(document.getElementById("filterValueMin").value);
  let filterValueMax = parseFloat(document.getElementById("filterValueMax").value);

  // Define an array of attributes that should only allow numeric input
  let numericAttributes = [
    "cost_in_credits",
    "length",
    "passengers",
    "crew",
    "consumables",
    "cargo_capacity",
    "hyperdrive_rating",
    "max_atmosphering_speed"
  ];

  // Define an array of attributes that should only allow alphabetic input
  let alphabeticAttributes = ["name", "model", "starship_class", "manufacturer"];

  let clearFiltersButton = document.getElementById("clearFiltersButton");
  clearFiltersButton.addEventListener("click", clearFilters);

  // Check if the selected filter attribute allows numeric input
  if (numericAttributes.includes(filterAttribute)) {
    // Check if the input value contains non-numeric characters
    if (/[^0-9.]/.test(filterValue)) {
      alert("Please enter a valid numeric value for this filter.");
      return; // Exit the function to prevent filtering
    }

    filterValue = parseFloat(filterValue); // Convert the input to a number
  } else if (alphabeticAttributes.includes(filterAttribute)) {
    // Check if the input value contains numeric characters
    if (/[0-9]/.test(filterValue)) {
      alert("Please enter alphabetic characters only for this filter.");
      return; // Exit the function to prevent filtering
    }
  }

  let filteredStarships = results.filter((starship) => {
    let attributeValue = String(starship[filterAttribute]).toLowerCase();

    if (!isNaN(starship[filterAttribute])) {
      if (filterType === "equal") {
        return starship[filterAttribute] === filterValue;
      } else if (filterType === "greaterThan") {
        return starship[filterAttribute] >= filterValueMin;
      } else if (filterType === "lessThan") {
        return starship[filterAttribute] <= filterValueMax;
      } else if (filterType === "between") {
        return (
          starship[filterAttribute] >= filterValueMin &&
          starship[filterAttribute] <= filterValueMax
        );
      }
    } else {
      return attributeValue.indexOf(filterValue) !== -1;
    }
  });

  let resultsContainer = document.querySelector(".results");
  resultsContainer.innerHTML = "";

  renderResult(filteredStarships);
}



function clearFilters() {
  document.getElementById("filterAttribute").value = "name";
  document.getElementById("filterType").value = "equal";
  document.getElementById("filterValue").value = "";
  document.getElementById("filterValueMin").value = "";
  document.getElementById("filterValueMax").value = "";

  // Re-fetch the original list of starships and re-render
  fetch('https://swapi.dev/api/starships/')
    .then(response => response.json())
    .then(data => {
      results = getSpaceships(data);
      renderResult(results);
    });
}

});

