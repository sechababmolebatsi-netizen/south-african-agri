import { useEffect, useState } from 'react';
import { getBloemfonteinWeather, describeWeatherCode } from '../Services/weatherService';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadWeather() {
    try {
      setLoading(true);
      setError('');
      const data = await getBloemfonteinWeather();
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Error loading weather data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather();
  }, []);

  if (loading) {
    return (
      <section className="card weather-card">
        <h2>Bloemfontein Agri-Weather</h2>
        <p className="muted">Fetching live Open-Meteo conditions...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card weather-card">
        <h2>Bloemfontein Agri-Weather</h2>
        <p className="error-text">{error}</p>
        <button className="btn-secondary" onClick={loadWeather}>Retry</button>
      </section>
    );
  }

  const current = weather.current;
  const condition = describeWeatherCode(current.weather_code);
  const soilMoisture = weather.hourly?.soil_moisture_0_to_1cm?.at(0);

  return (
    <section className="card weather-card">
      <div className="card-header">
        <div>
          <span className="badge">
            {weather.isFallback ? 'Offline Snapshot' : 'Live · Open-Meteo'}
          </span>
          <h2>Bloemfontein, Free State</h2>
        </div>
        <button className="btn-secondary" onClick={loadWeather} title="Refresh weather">
          Refresh
        </button>
      </div>

      <div className="weather-hero">
        <span className="weather-icon" aria-hidden="true">{condition.icon}</span>
        <div>
          <div className="temp-main">{Math.round(current.temperature_2m)}°C</div>
          <div className="muted">{condition.label}</div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-box">
          <span className="metric-label">Humidity</span>
          <strong>{current.relative_humidity_2m}%</strong>
        </div>
        <div className="metric-box">
          <span className="metric-label">Wind Speed</span>
          <strong>{current.wind_speed_10m} km/h</strong>
        </div>
        <div className="metric-box">
          <span className="metric-label">Precipitation</span>
          <strong>{current.precipitation} mm</strong>
        </div>
        <div className="metric-box">
          <span className="metric-label">Topsoil Moisture</span>
          <strong>{soilMoisture !== undefined ? `${(soilMoisture * 100).toFixed(0)}%` : 'N/A'}</strong>
        </div>
      </div>

      <div className="forecast-row">
        {weather.daily.time.slice(0, 4).map((dateStr, idx) => {
          const dayLabel = idx === 0
            ? 'Today'
            : new Date(dateStr).toLocaleDateString('en-ZA', { weekday: 'short' });
          return (
            <div key={dateStr} className="forecast-day">
              <span className="day-name">{dayLabel}</span>
              <span className="day-temps">
                {Math.round(weather.daily.temperature_2m_max.at(idx))}° / {Math.round(weather.daily.temperature_2m_min.at(idx))}°
              </span>
              <span className="day-rain">💧 {weather.daily.precipitation_probability_max.at(idx)}%</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
