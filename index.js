// Function to display the current date and time
let now = new Date();
let date = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

date.innerHTML = `${day} ${hours}:${minutes} moderate rain`;

// Function to display the city name
function displayCity(city) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  return city;
}

// Function to handle the form submission and fetch weather data
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  displayCity(city);
  fetchWeatherData(city);
}

// Function to display the temperature
function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector(".current-temperature-value");
  temperatureElement.innerHTML = `${temperature}`;
}

// Function to fetch weather data from the API
function fetchWeatherData(city) {
  let apiKey = "4f2360cc5d2fbf9f02a9o90ddad3f50t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

// Debounce function to limit the rate of API calls
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

//Add event listener to the form
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Fetch weather data for the deafault city on page load
fetchWeatherData(`Paris`);
