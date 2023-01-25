import fetchWeatherData from "./js/forecast";
import { calcAvg, dayFormatter, getIconUrl, navigatorGeolocationPromise, setDOMValue } from "./js/utils";

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

function renderDailyWeather(daily) {
  const dailyEl = document.querySelector("#daily");

  dailyEl.innerHTML = null;

  const html = daily
    .map((day) => {
      return `
      <div class="daily-card">
        <img src=${getIconUrl(day.iconCode)} alt="Weather icon" title="Weather icon" class="weather-icon" />
        <div class="daily-card__day">${dayFormatter(day.timestamp, "long")}</div>
        <div><span>${Math.round(calcAvg(day.maxTemp, day.minTemp))}</span><span>&deg;<span></div>
      </div>
    `;
    })
    .join("");

  dailyEl.insertAdjacentHTML("afterbegin", html);
}

function renderHourlyWeather(hourly) {}
