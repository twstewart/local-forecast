import fetchWeatherData from "./js/forecast";
import { navigatorGeolocationPromise } from "./js/utils";

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
  console.log("🚀 | file: app.js:19 | current", current);
}

function renderDailyWeather(daily) {
  console.log("🚀 | file: app.js:23 | daily", daily);
}

function renderHourlyWeather(hourly) {
  console.log("🚀 | file: app.js:27 | hourly", hourly);
}
