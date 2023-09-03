document.addEventListener("DOMContentLoaded", function() {
  const starshipCard = document.getElementById("starshipCard");

  starshipCard.addEventListener("click", function() {
      loadSpaceshipFeature();
  });
});

let results; // Store the results in the global scope
let starshipRatings = {}; // Object to store star ratings for each starship


function loadSpaceshipFeature() {
  const contentContainer = document.querySelector(".content-container");

  // Replace the content of the content-container with the spaceship renting feature's HTML
  contentContainer.innerHTML = `
    <h2>Star Wars Starships</h2>
    <div>
        <label for="filterAttribute">Filter Attribute:</label>
        <select id="filterAttribute">
            <option value="name">Starship Name</option>
            <option value="cost_in_credits">Cost</option>
            <option value="model">Model</option>
            <option value="starship_class">Starship Class</option>
            <option value="length">Length</option>
            <option value="passengers">Number Passengers</option>
            <option value="crew">Number Crew</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="consumables">Consumables</option>
            <option value="cargo_capacity">Cargo Capacity</option>
            <option value="hyperdrive_rating">Hyperdrive Rating</option>
            <option value="max_atmosphering_speed">Atmosphering Speed</option>
        </select>
        <label for="filterType">Filter Type:</label>
        <select id="filterType">
            <option value="equal">=</option>
            <option value="greaterThan" disabled>>=</option>
            <option value="lessThan" disabled><=</option>
            <option value="between" disabled>Between</option>
        </select>
        <input type="text" id="filterValue" placeholder="Enter filter input">
        <input type="number" id="filterValueMin" placeholder="Min Value (Numeric)" style="display: none;">
        <input type="number" id="filterValueMax" placeholder="Max Value (Numeric)" style="display: none;">
        <button id="filterButton">Filter</button>
        <button id="clearFiltersButton">Clear Filters</button>
    <div>
        <p>Select Starship:</p>
    </div>
    <div class="results"></div>
  `;





fetch('https://swapi.dev/api/starships/')
  .then(response => response.json())
  .then(data => {
    results = getSpaceships(data);
    renderResult(results);
  });


// Makes an API call and organizes the data obtained in the key:value format
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


// Handles the functionality of the "select" button
function handleSelect(index) {

  let selectedButton = document.querySelectorAll(".select-button")[index];
  let buttonText = selectedButton.textContent;

  // If the button is currently selected, change it back to "Select" and reset the selectedSpaceshipIndex
  if (buttonText === "Selected") {
    selectedButton.textContent = "Select Starship";
    selectedSpaceshipIndex = -1;
  } else {
    // If not selected, change it to "Selected" and update the selectedSpaceshipIndex
    selectedButton.textContent = "Selected";
    selectedSpaceshipIndex = index;
  }
}


// Accumulates and organizes all the logic and functionality of what is rendered to the user
function renderResult(results) {
  let resultsContainer = document.querySelector(".results");
  let ul = document.createElement("ul");

  results.forEach((starship, index) => {
    let li = document.createElement("li");
    li.textContent = `${starship.name}`;

    let img = document.createElement("img");
    img.src = `./js/assets/starships/${encodeURIComponent(starship.name)}.png`;
    img.alt = `${starship.name} Starship`;

    nestedUl = document.createElement("ul");

    for (let attribute in starship) {
      let nestedLi = document.createElement("li");
      nestedLi.textContent = `${attribute}: ${starship[attribute]}`;
      nestedUl.appendChild(nestedLi);
    }

    let selectButton = document.createElement("button");
    selectButton.textContent = "Select Starship";
    selectButton.classList.add("select-button");

    // Create a container div for spacing elements
    let spacingDiv = document.createElement("div");
    spacingDiv.appendChild(document.createElement("br"));

    // Create a container div for spacing elements
    let rateStarshipDiv = document.createElement("div");
    rateStarshipDiv.textContent = "Rate Starship";
    spacingDiv.appendChild(rateStarshipDiv);

    // Create star rating buttons using Unicode star characters
    let starRatingDiv = document.createElement("div");
    starRatingDiv.classList.add("star-rating");

    for (let i = 1; i <= 5; i++) {
      let starButton = document.createElement("button");
      starButton.innerHTML = "&#9733;"; // Unicode star character
      starButton.classList.add("star-button");
      starButton.dataset.rating = i; // Store the rating value as a data attribute
      starButton.classList.add("white-star");

      starButton.addEventListener("click", () => handleStarRating(index, i, starButton));
      starRatingDiv.appendChild(starButton);
    }

    spacingDiv.appendChild(starRatingDiv);
    spacingDiv.appendChild(document.createElement("br"));

    // Create a comment box
    let commentBox = document.createElement("textarea");
    commentBox.placeholder = "Add your comment here";
    commentBox.classList.add("comment-box");
    commentBox.addEventListener("input", (event) => handleCommentInput(index, event));

    // Create the "Send" button
    let sendButton = document.createElement("button");
    sendButton.textContent = "Send";
    sendButton.classList.add("send-button");
    sendButton.addEventListener("click", () => handleSendComment(index));

    spacingDiv.appendChild(commentBox);
    spacingDiv.appendChild(sendButton);

    li.appendChild(img);
    li.appendChild(document.createElement("br"));
    li.appendChild(nestedUl);
    li.appendChild(document.createElement("br"));
    li.appendChild(selectButton);
    li.appendChild(spacingDiv);
    ul.appendChild(li);
    ul.appendChild(document.createElement("br"));
  });

  resultsContainer.appendChild(ul);

  // Add event listener for the "Select" buttons
  resultsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("select-button")) {
      const selectedButton = event.target;
      const selectedLi = selectedButton.parentElement;
      const selectedIndex = Array.from(ul.children).indexOf(selectedLi);

      handleSelect(selectedIndex);
    }

  // Create star rating buttons
  let starRatingDiv = document.createElement("div");
  starRatingDiv.classList.add("star-rating");

  for (let i = 1; i <= 5; i++) {
    let starButton = document.createElement("button");
    starButton.textContent = i;
    starButton.addEventListener("click", () => handleStarRating(index, i));
    starRatingDiv.appendChild(starButton);
}

});

}


// Handles the management of the star rating button
function handleStarRating(index, rating, starButton) {
  // Store the star rating in the object
  starshipRatings[index] = rating;

  // Get all star buttons within the same star rating
  let starButtons = starButton.parentElement.querySelectorAll(".star-button");

  // Toggle the class for gold and white stars
  starButtons.forEach((button, i) => {
    if (i < rating) {
      button.classList.remove("white-star");
    } else {
      button.classList.add("white-star");
    }
  });
}


// Handles the management of the input in the comment box
function handleCommentInput(index, event) {
  // Store the comment in the starshipRatings object
  starshipRatings[index] = {
    rating: starshipRatings[index] || 0, // Default to 0 if rating is not set
    comment: event.target.value,
  };
}

function handleSendComment(index) {
  let commentBox = document.querySelectorAll(".comment-box")[index];
  let commentText = commentBox.value;

  // Demonstration
  console.log(`Comment for starship ${results[index].name}: ${commentText}`);
}


// Creating the filter button
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



  // Enable/disable filterType options based on the selected attribute
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


// Handles the filter button conditions depending on the result data
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
      return; // Exit the function
    }

    filterValue = parseFloat(filterValue); // Convert the input to a number
  } else if (alphabeticAttributes.includes(filterAttribute)) {
    // Check if the input value contains numeric characters
    if (/[0-9]/.test(filterValue)) {
      alert("Please enter alphabetic characters only for this filter.");
      return; // Exit the function
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


// Clear filter elements
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

}