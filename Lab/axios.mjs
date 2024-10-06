import axios from "axios";

// Set your API key and configure Axios
const API_KEY =
  "live_I3QIixqPqOvrsJToiAWwulch5VehBqkWRaKU2yRpbb7ySfQl4ngBzNkFgeGviYSk"; 
axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
axios.defaults.headers.common["x-api-key"] = API_KEY; // Set the API key in headers

// The breed selection input element
const breedSelect = document.getElementById("breedSelect");
const carousel = document.getElementById("carousel");
const infoDump = document.getElementById("infoDump");

// Async function to load cat breeds and populate the dropdown
async function initialLoad() {
  try {
    const response = await axios.get("breeds"); // Fetch the list of breeds using Axios
    const breeds = response.data; // Get the breeds from the response

    // Loop through each breed and create an option element
    breeds.forEach((breed) => {
      const option = document.createElement("option"); // Create a new <option> element
      option.value = breed.id; // Set the value attribute to the breed ID
      option.textContent = breed.name; // Set the display text to the breed name
      breedSelect.appendChild(option); // Append the option to the dropdown
    });

    // Trigger the change event to load initial breed info
    breedSelect.dispatchEvent(new Event("change"));
  } catch (error) {
    console.error("Error fetching breeds:", error); // Log any errors
  }
}

// Immediately execute the initialLoad function
initialLoad();

// Event listener for when a breed is selected from the dropdown
breedSelect.addEventListener("change", async (event) => {
  const selectedBreedId = event.target.value; // Get the selected breed ID

  // Clear previous carousel items and info dump
  carousel.innerHTML = ""; // Clear the carousel
  infoDump.innerHTML = ""; // Clear the info section

  try {
    // Fetch images of the selected breed from the Cat API using Axios
    const response = await axios.get(
      `images/search?breed_id=${selectedBreedId}&limit=5`
    );
    const breedImages = response.data; // Parse the data from the response

    // Loop through each image in the response array
    breedImages.forEach((image) => {
      const imgElement = document.createElement("img"); // Create an image element
      imgElement.src = image.url; // Set the image source to the URL
      imgElement.alt = "Cat image"; // Set an alt attribute for accessibility
      imgElement.className = "carousel-item"; // Add a class for styling
      carousel.appendChild(imgElement); // Append the image to the carousel
    });

    // Create an informational section for the breed
    const breedInfo = breedImages[0].breeds[0]; // Access the breed information
    const infoElement = document.createElement("div"); // Create a new div for breed info
    infoElement.innerHTML = `
            <h2>${breedInfo.name}</h2>
            <p>${breedInfo.description}</p>
            <p>Temperament: ${breedInfo.temperament}</p>
            <p>Origin: ${breedInfo.origin}</p>
        `;
    infoDump.appendChild(infoElement); // Append the breed info to the infoDump section
  } catch (error) {
    console.error("Error fetching breed images:", error); // Log any errors
  }
});
