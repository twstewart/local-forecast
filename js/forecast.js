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

function parseCurrentWeather({ current_weather, daily }) {
  const { temperature: currentTemp, windspeed: windSpeed, weathercode: iconCode } = current_weather;
  const {
    temperature_2m_max,
    temperature_2m_min,
    apparent_temperature_max,
    apparent_temperature_min,
    precipitation_sum,
  } = daily;

  return {
    currentTemp: Math.round(currentTemp),
    lowTemp: Math.round(temperature_2m_min[0]),
    lowFeelsLike: Math.round(apparent_temperature_min[0]),
    highTemp: Math.round(temperature_2m_max[0]),
    highFeelsLike: Math.round(apparent_temperature_max[0]),
    windSpeed: Math.round(windSpeed),
    precipitation: Math.round(precipitation_sum[0] * 100) / 100,
    iconCode,
  };
}

function parseDailyWeather({ daily }) {
  return daily.time.map((t, i) => ({
    timestamp: t * 1000,
    iconCode: daily.weathercode[i],
    maxTemp: daily.temperature_2m_max[i],
    minTemp: daily.temperature_2m_min[i],
  }));
}

function parseHourlyWeather({ hourly, current_weather }) {
  return hourly.time
    .map((t, i) => ({
      timestamp: t * 1000,
      iconCode: hourly.weathercode[i],
      temp: Math.round(hourly.temperature_2m[i]),
      feelsLike: Math.round(hourly.apparent_temperature[i]),
      windSpeed: Math.round(hourly.windspeed_10m[i]),
      precipitation: Math.round(hourly.precipitation[i] * 100) / 100,
    }))
    .filter(({ timestamp }) => timestamp >= current_weather.time * 1000);
}
