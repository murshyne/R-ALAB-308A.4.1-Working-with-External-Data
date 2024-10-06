import * as Carousel from "./Carousel.mjs";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY ="live_I3QIixqPqOvrsJToiAWwulch5VehBqkWRaKU2yRpbb7ySfQl4ngBzNkFgeGviYSk"; // Replace with your actual API key
axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
axios.defaults.headers.common["x-api-key"] = API_KEY;

// Create an async function "initialLoad" that does the following:
// Retrieve a list of breeds from the cat API using fetch().
async function initialLoad() {
  try {
    // Fetch the list of cat breeds from the API
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const breeds = await response.json();

    // Create new <options> for each of these breeds
    breeds.forEach((breed) => {
      const option = document.createElement("option");

      // Each option should have a value attribute equal to the id of the breed.
      option.value = breed.id;

      // Each option should display text equal to the name of the breed.
      option.textContent = breed.name;

      // Append them to breedSelect.
      breedSelect.appendChild(option);
    });
    breedSelect.dispatchEvent(new Event("change"));
  } catch (error) {
    // Log any errors
    console.error("Error fetching breeds:", error);
  }
}
//function execution.
initialLoad();
//  * This function should execute immediately.

// Event handler retrieves breed's ID using event.target.value when a breed is selected from the dropdown
breedSelect.addEventListener("change", async (event) => {
  const selectedBreedId = event.target.value;

  // Clear previous carousel items and info dump
  carousel.innerHTML = "";
  infoDump.innerHTML = "";

  try {
    // Retrieve information on the selected breed from the cat API using fetch()
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_id=${selectedBreedId}&limit=5`
    );

    // Makes sure request is receiving multiple array items!
    const breedImages = await response.json();

    // Loop through each image in the response array
    breedImages.forEach((image) => {
      // For each object in the response array, create a new element for the carousel
      const imgElement = document.createElement("img");
      // Set the image source to the URL
      imgElement.src = image.url;
      // Set an alt attribute for accessibility
      imgElement.alt = "Cat image";
      // Add a class for styling
      imgElement.className = "carousel-item";

      // Append each of these new elements to the carousel
      carousel.appendChild(imgElement);
    });

    // Use the other data you have been given to create an informational section within the infoDump element
    // Access the breed information

    // Use the template to create breed information
    const breedInfoTemplate = document
      .getElementById("breedInfoTemplate")
      .content.cloneNode(true);
    const breedInfo = breedImages[0].breeds[0];

    breedInfoTemplate.querySelector(".breed-name").textContent = breedInfo.name;
    breedInfoTemplate.querySelector(".breed-description").textContent =
      breedInfo.description;
    breedInfoTemplate.querySelector(
      ".breed-temperament"
    ).textContent = `Temperament: ${breedInfo.temperament}`;
    breedInfoTemplate.querySelector(
      ".breed-origin"
    ).textContent = `Origin: ${breedInfo.origin}`;

    // Append the breed info to the infoDump section
    infoDump.appendChild(infoElement);
  } catch (error) {
    // Log any errors
    console.error("Error fetching breed images:", error);
  }
});
