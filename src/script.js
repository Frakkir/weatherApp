let apiKey = "f1f501c888b4b930b3a7e076cecf3a88";

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
 
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

  return `${day} ${formatHours(timestamp)}`;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

  let dateEl = document.querySelector("#date");
  dateEl.innerHTML = formatDate(new Date());

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
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

}

function formatHours (timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function getCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayForecast (response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  // debugger

  for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h3>
    ${formatHours(forecast.dt * 1000)}
  </h3>
  <img
  src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt=""/>
  <div class="weather-forecast-temperature">
  <strong>${Math.round(forecast.main.temp_max)}°</strong>${Math.round(forecast.main.temp_min)}°
  </div>
  </div>`
  }


}

function showPosition(position) {

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature).catch(console.error);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrent);



function displayFahrenheitTemperature (event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusTemperature = null; 
 
function displayCelsiusTemperature (event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature); 
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


