const BLOEMFONTEIN = {
  latitude: -29.0852,
  longitude: 26.1596,
};

export function describeWeatherCode(code) {
  if (code === 0) return { label: 'Clear Sky', icon: '☀️' };
  if ([1, 2, 3].includes(code)) return { label: 'Partly Cloudy', icon: '⛅' };
  if ([45, 48].includes(code)) return { label: 'Fog / Mist', icon: '🌫️' };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { label: 'Rain Showers', icon: '🌧️' };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorms', icon: '⛈️' };
  return { label: 'Variable Conditions', icon: '🌤️' };
}

export async function getBloemfonteinWeather() {
  const params = new URLSearchParams({
    latitude: BLOEMFONTEIN.latitude,
    longitude: BLOEMFONTEIN.longitude,
    current: 'temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code',
    hourly: 'soil_moisture_0_to_1cm',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'Africa/Johannesburg',
    forecast_days: 4,
  });

  const res = await fetch(`https://open-meteo.com{params}`);
  if (!res.ok) {
    throw new Error('Unable to reach Open-Meteo weather service.');
  }

  return res.json();
}
