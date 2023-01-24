export default async function fetchWeatherData(lat, lng, tz) {
  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${tz}`;

  const res = await fetch(endpoint);
  const data = await res.json();

  return {
    current: parseCurrentWeather(data),
    daily: parseDailyWeather(data),
    hourly: parseHourlyWeather(data),
  };
}

function parseCurrentWeather() {}

function parseDailyWeather() {}

function parseHourlyWeather() {}
