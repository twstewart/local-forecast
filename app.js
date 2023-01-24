import fetchWeatherData from "./js/forecast";

const latLng = [10, 10];
const tz = new Intl.DateTimeFormat().resolvedOptions().timeZone;

const { current, daily, hourly } = await fetchWeatherData(latLng[0], latLng[1], tz);
