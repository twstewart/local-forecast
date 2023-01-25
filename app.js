import fetchWeatherData from "./js/forecast";
import { navigatorGeolocationPromise, setDOMValue, getIconUrl } from "./js/utils";

navigatorGeolocationPromise()
  .then((position) => {
    const { latitude: lat, longitude: lng } = position.coords;
    return { lat, lng, tz: new Intl.DateTimeFormat().resolvedOptions().timeZone };
  })
  .then(({ lat, lng, tz }) => {
    return fetchWeatherData(lat, lng, tz);
  })
  .then(renderWeather)
  .catch((err) => {
    if (err.code === 1) {
      alert("Application needs access to your current location to retrieve weather data.");
    } else {
      alert("An error occurred attempting to retrieve the weather. Please try again later...");
    }
  });

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current);
  renderDailyWeather(daily);
  renderHourlyWeather(hourly);
}

function renderCurrentWeather(current) {
  const currentIconEl = document.querySelector("#weather-icon");
  const { currentTemp, highFeelsLike, highTemp, iconCode, lowFeelsLike, lowTemp, precipitation, windSpeed } = current;

  currentIconEl.src = getIconUrl(iconCode);

  setDOMValue("#current-temp", currentTemp);
  setDOMValue("#max-temp", highTemp);
  setDOMValue("#feels-like-high", highFeelsLike);
  setDOMValue("#min-temp", lowTemp);
  setDOMValue("#feels-like-low", lowFeelsLike);
  setDOMValue("#wind", windSpeed);
  setDOMValue("#precipitation", precipitation);
}

function renderDailyWeather(daily) {}

function renderHourlyWeather(hourly) {}
