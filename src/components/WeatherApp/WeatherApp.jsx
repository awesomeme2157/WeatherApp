/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./WeatherApp.css";

import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import search_icon from "../Assets/search.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("--");
  const [location, setLocation] = useState("Location");
  const [humidity, setHumidity] = useState("--");
  const [wind, setWind] = useState("--");
  const [wicon, setWicon] = useState(cloud_icon);

  const weatherIconMap = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const handleSearch = async () => {
    if (city.trim() === "") return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();

      // Update the state with the fetched data
      setLocation(data.name);
      setTemperature(`${Math.floor(data.main.temp)}°C`);
      setHumidity(`${data.main.humidity}%`);
      setWind(`${Math.floor(data.wind.speed)} km/h`);
      setWicon(weatherIconMap[data.weather[0].icon] || cloud_icon); // Default to cloud icon if not found
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert(error.message); // Show specific error message
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="search-icon" onClick={handleSearch}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt={`Weather icon for ${location}`} />
      </div>
      <div className="weather-temp">{temperature}</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="Humidity Icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="Wind Icon" className="icon" />
          <div className="data">
            <div className="wind-rate">{wind}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
