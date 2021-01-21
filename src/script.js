let apiKey = "f1f501c888b4b930b3a7e076cecf3a88";

function formatDate() {
  let now = new Date();
  let hours = now.getHours();

  let minutes = now.getMinutes();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let dateEl = document.querySelector("#date");
  dateEl.innerHTML = `${day}, ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
formatDate();

function showTemperature(response) {
  console.log(response.data);
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#windSpeed");
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round (response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

}

function getCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(showTemperature).catch(console.error);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrent);