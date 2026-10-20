import { useState } from "react";
import "./App.css";

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

function App() {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async (event) => {
    event.preventDefault();

    if (!city.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Find the city
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );

      if (!locationResponse.ok) {
        throw new Error("Could not find location");
      }

      const locationData = await locationResponse.json();

      if (!locationData.results) {
        throw new Error("City not found");
      }

      const place = locationData.results[0];

      // Get weather
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
      );

      if (!weatherResponse.ok) {
        throw new Error("Could not fetch weather");
      }

      const weatherData = await weatherResponse.json();

      setLocation(place);
      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getDescription = (code) => {
    return weatherDescriptions[code] || "Unknown";
  };

  const getDay = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <div className="app">
      <div className="container">

        <header className="header">
          <div>
            <div className="terminal-text">$ weather</div>
            <h1>Weather Dashboard v2</h1>
          </div>

          <div className="live">
            <span className="live-dot"></span>
            LIVE
          </div>
        </header>

        <form className="search" onSubmit={searchWeather}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
          />

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {weather && location && (
          <>
            <section className="weather-card">

              <div className="location">
                <div>
                  <h2>{location.name}</h2>

                  <p>
                    {location.admin1
                      ? `${location.admin1}, ${location.country}`
                      : location.country}
                  </p>
                </div>

                <div className="coordinates">
                  {location.latitude.toFixed(2)}°,
                  {" "}
                  {location.longitude.toFixed(2)}°
                </div>
              </div>

              <div className="current">

                <div className="temperature">
                  {Math.round(weather.current.temperature_2m)}
                  <span>°C</span>
                </div>

                <div className="condition">
                  <h3>
                    {getDescription(weather.current.weather_code)}
                  </h3>

                  <p>
                    Feels like{" "}
                    {Math.round(weather.current.apparent_temperature)}
                    °C
                  </p>
                </div>

              </div>

              <div className="stats">

                <div>
                  <span>HUMIDITY</span>
                  <strong>
                    {weather.current.relative_humidity_2m}%
                  </strong>
                </div>

                <div>
                  <span>WIND</span>
                  <strong>
                    {Math.round(weather.current.wind_speed_10m)} km/h
                  </strong>
                </div>

                <div>
                  <span>PRESSURE</span>
                  <strong>
                    {Math.round(weather.current.surface_pressure)} hPa
                  </strong>
                </div>

              </div>

            </section>

            <section className="forecast">

              <div className="section-title">
                5 DAY FORECAST
              </div>

              <div className="forecast-grid">

                {weather.daily.time.map((date, index) => (
                  <div className="forecast-card" key={date}>

                    <span className="day">
                      {getDay(date)}
                    </span>

                    <span className="description">
                      {getDescription(
                        weather.daily.weather_code[index]
                      )}
                    </span>

                    <div className="forecast-temp">
                      <strong>
                        {Math.round(
                          weather.daily.temperature_2m_max[index]
                        )}°
                      </strong>

                      <span>
                        {Math.round(
                          weather.daily.temperature_2m_min[index]
                        )}°
                      </span>
                    </div>

                  </div>
                ))}

              </div>

            </section>
          </>
        )}

        {!weather && !loading && !error && (
          <div className="welcome">
            <span>&gt; Enter a city to get the weather.</span>
          </div>
        )}

        <footer>
          <span>WEATHER DASHBOARD</span>
          <span>POWERED BY OPEN-METEO</span>
        </footer>

      </div>
    </div>
  );
}

export default App;
