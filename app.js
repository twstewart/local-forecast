import fetchWeatherData from "./js/forecast";

const latLng = [10, 10];
const tz = new Intl.DateTimeFormat().resolvedOptions().timeZone;

const { current, daily, hourly } = await fetchWeatherData(latLng[0], latLng[1], tz);
console.log("🚀 | file: app.js:7 | current", current);
console.log("🚀 | file: app.js:7 | daily", daily);
console.log("🚀 | file: app.js:7 | hourly", hourly);
